from resource_validator import validate_json
from flask import request
from flask import Flask
import os
import json
import uuid
import boto3
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all
from aws_xray_sdk.ext.flask.middleware import XRayMiddleware

app = Flask(__name__)
resource_collection_name = 'Resources'
dynamodb_table = os.environ['DYNAMODB_TABLE']
dynamodb = boto3.resource('dynamodb')

xray_recorder.configure(service='Resource API')#, plugins=('ECSPlugin'))
XRayMiddleware(app, xray_recorder)
patch_all()

# DynamoDB: 
@app.route("/create", methods=['POST'])
def dynamodb_create():
    request_json = request.get_json()
    is_valid, message = validate_json(request_json)
    if not is_valid:
        return {'message': message}, 400

    request_json['_id'] = str(uuid.uuid1())

    table = dynamodb.Table(dynamodb_table)
    table.put_item(Item=request_json)

    return {'insertedId': request_json['_id'] }, 201

@app.route("/update/<string:id>", methods=['PUT'])
def dynamodb_update(id):
    request_json = request.get_json()

    updatable_fields = ['Name', 'DateOfPublication', 'Type', 'Author', 'Tags', 'Description']
    table = dynamodb.Table(dynamodb_table)

    update_expression_array = []
    expression_attribute_values = {}
    expression_attribute_names = {}

    for field in updatable_fields:
        if field in request_json.keys():
            field_expression_name = '#' + field + 'field'
            update_expression_array.append(field_expression_name + ' = :' + field)
            expression_attribute_values[':' + field] = request_json[field]
            expression_attribute_names[field_expression_name] = field

    update_expression = 'SET ' + ', '.join(update_expression_array)
    print(update_expression)
    print(expression_attribute_values)
    table.update_item(
        Key={
            "_id": id
        },
        UpdateExpression=update_expression,
        ExpressionAttributeValues=expression_attribute_values,
        ExpressionAttributeNames=expression_attribute_names
    )
    return {'updatedId': id }, 200

@app.route("/delete/<string:id>", methods=['DELETE'])
def dynamodb_delete(id):
    table = dynamodb.Table(dynamodb_table)
    response = table.get_item(
        Key={
            "_id": id
        }
    )
    print(response)
    if('Item' not in response):
        return { 'message': 'The resource was not found.' }, 404
    else:
        table.delete_item(
            Key={
                '_id': id
            }
        )
        return { 'message': 'The resource was deleted.' }, 200
 
@app.route("/get/<string:id>", methods=['GET'])
def dynamodb_get(id):
    table = dynamodb.Table(dynamodb_table)
    item = table.get_item(
        Key={
            "_id": id
        }
    )
    if('Item' not in item.keys()):
        return { 'message': 'The resource was not found'}, 404
    else:
        return item['Item']

@app.route("/list", methods=['GET'])
def dynamodb_list():
    table = dynamodb.Table(dynamodb_table)
    scan_result = table.scan()
    response = {
        "count": scan_result['Count'],
        "data": scan_result['Items']
    }
    return { 'data': response }, 200


if __name__ == "__main__":
    app.run(host='0.0.0.0')