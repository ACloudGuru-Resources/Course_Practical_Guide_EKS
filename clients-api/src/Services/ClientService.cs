using ACG.EKS.Bookstore.Clients_API.Models;
using Amazon;
using Amazon.Runtime;
using System;
using System.Collections.Generic;
using System.Linq;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.DataModel;
using System.Threading;
using System.Threading.Tasks;
using Amazon.XRay.Recorder.Core;
using Amazon.XRay.Recorder.Handlers.AwsSdk;
using Amazon.XRay.Recorder.Handlers.System.Net;
using Amazon.XRay.Recorder.Core.Internal.Entities;

namespace ACG.EKS.Bookstore.Clients_API.Services
{
    public class ClientService
    {
        private readonly AmazonDynamoDBClient _dynamoDBClient;
        private readonly DynamoDBContext _context;

        public ClientService(IDynamoDBSettings settings) 
        {
            _dynamoDBClient = new AmazonDynamoDBClient(RegionEndpoint.USEast2);
            var config = new DynamoDBContextConfig { TableNamePrefix = settings.Prefix };
            _context = new DynamoDBContext(_dynamoDBClient, config);
        }

        public async Task Create(Client client)
        {
            client.Id = Guid.NewGuid().ToString();
            await _context.SaveAsync<Client>(client);
        }

        public async Task<List<Client>> List() {
            var search = _context.ScanAsync<Client>
            (
                new[]
                {
                    new ScanCondition
                    (
                        nameof(Client.Id),
                        ScanOperator.IsNotNull
                    )
                }
            );
            var result = await search.GetRemainingAsync();
            return result;
        }
        
        public async Task<Client> Get(string id) =>
            await _context.LoadAsync<Client>(id);

        public async Task Update(Client newClientData) =>
            await _context.SaveAsync<Client>(newClientData);

        // public void Delete(string id) =>
        //     _clients.DeleteOne(client => client.Id == id);
        
        // public void Delete(Client c) =>
        //     _clients.DeleteOne(client => client.Id == c.Id);
    }
}