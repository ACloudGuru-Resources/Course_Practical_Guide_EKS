var AWSXRay = require('aws-xray-sdk');
const express = require('express');
const morgan = require('morgan');

AWSXRay.captureHTTPsGlobal(require('http'));
AWSXRay.captureHTTPsGlobal(require('https'));

const http_client = require('http');
const https_client = require('https');

const app = express();
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const uuidv1 = require('uuid/v1');
const async = require('async');
const { url } = require('inspector');

app.use(morgan('short'));
app.use(express.json());

const port = 5001;
const resourceApiEndpont = process.env.RESOURCE_API_ENDPOINT || 'http://localhost:5000';
const dynamodbTable = process.env.DYNAMODB_TABLE || 'development-inventory' ;
const awsDefaultRegion = process.env.AWS_DEFAULT_REGION || 'us-east-2'
const dynamoDb = new AWS.DynamoDB.DocumentClient({region: awsDefaultRegion});

app.use(AWSXRay.express.openSegment('Inventory API'));

app.post('/register', (request, response) => {
    inventoryRegistryJson = request.body;
    // TODO: Validate
    
    resourceApiUrl = resourceApiEndpont + '/get/' + inventoryRegistryJson.ResourceId;
    
    client = resourceApiUrl.startsWith("http://") ? http_client : https_client;

    resourceApiResponse = client.get(resourceApiUrl, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            if(inventoryRegistryJson.Available == undefined) {
                inventoryRegistryJson.Available = true
            }

            inventoryRegistryJson._id = uuidv1();
            
            var params = {
                TableName: dynamodbTable,
                Item: inventoryRegistryJson
            }

            dynamoDb.put(params, function(err, data){
                if(err) {
                    console.log(err)
                    response.status(500)
                        .json({ success: false, message: 'Error: Server error' });
                } else{
                    console.log('data', data);
                    response.status(201)
                        .json({ 'insertedId': inventoryRegistryJson._id })
                }
            })    
        });
        resp.on('error', (err) => {
            if(resp.statusCode == 404) {
                response.status(404)
                .json({'message': "The resource wasn't found."})
            } else {
                console.log(err)
            }
        });
    })
})

app.get('/list/:resourceId', async (request, response) => {
    var id = request.params.resourceId;
    var isAvailableArg = request.query.available
    var isAvailable = true

    if(isAvailableArg != undefined) {
        isAvailable = (isAvailableArg == 'true')
    }
    var params = {
        TableName: dynamodbTable,
        ExpressionAttributeValues: {
            ":r": id,
            ":a": isAvailable 
        },
        FilterExpression: "ResourceId = :r and Available = :a"
    }
    dynamoDb.scan(params, function(err,data) {
        console.log('data', data)
        response.json(data)
    })
})

app.put('/setAvailability/:id', async (request, response) => {
    var isAvailable = request.body.Available;
    var id = request.params.id;

    var params = {
        TableName: dynamodbTable,
        Key: {
            "_id": id
        },
        UpdateExpression: "SET #available = :a",
        ExpressionAttributeValues: {
            ":a": isAvailable 
        },
        ExpressionAttributeNames: {
            "#available": "Available" 
        }
    }
    dynamoDb.update(params, function(err,data) {
        response.json({ "message": "Updated successully" })
    })
})

app.get('/summary', function(request, response) {
    resourceApiListUrl = resourceApiEndpont + "/list"
    console.log(resourceApiListUrl)

    client = resourceApiListUrl.startsWith("http://") ? http_client : https_client;
    resourceApiResponse = client.get(resourceApiListUrl, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            console.log(data)
            let listOfResources = JSON.parse(data)
            const r = iterateResponsePromise(listOfResources, response)      
        });
        resp.on('error', (err) => {
            console.log(err)
        });
        
    })
})

app.use(AWSXRay.express.closeSegment());

async function iterateResponsePromise(listOfResources, response) {
    async.map(listOfResources.data.data, function(item, callback) {
        // Set ID
        var tempObject = {
            ResourceId: item._id,
            ResourceName: item.Name,
            AvailableCopies: 0,
            UnavailableCopies: 0,
            TotalCopies: 0
        }

        var params = {
            TableName: dynamodbTable,
            ExpressionAttributeValues: {
                ":r": item._id,
                ":a": true 
            },
            FilterExpression: "ResourceId = :r and Available = :a"
        }
        dynamoDb.scan(params, (err,data) => {
            
            tempObject.AvailableCopies = data.Count;

            var paramsUnavailable = {
                TableName: dynamodbTable,
                ExpressionAttributeValues: {
                    ":r": item._id,
                    ":a": false
                },
                FilterExpression: "ResourceId = :r and Available = :a"
            }
            dynamoDb.scan(paramsUnavailable, (err,data) => {
                tempObject.UnavailableCopies = data.Count;
                tempObject.TotalCopies = tempObject.AvailableCopies + tempObject.UnavailableCopies;
                callback(null, tempObject);
            })
        })

    }, function(err, results){
        if(err) return console.log(err);
        response.json(results)
    })
}

app.listen(port, () => {
    console.log('Inventory API Running...');
})