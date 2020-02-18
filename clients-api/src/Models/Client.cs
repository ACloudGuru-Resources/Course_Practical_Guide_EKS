using Newtonsoft.Json;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;

namespace ACG.EKS.Bookstore.Clients_API.Models
{
    [DynamoDBTable("clients")]
    public class Client
    {
        [DynamoDBHashKey]
        [JsonProperty("_id")]
        [DynamoDBProperty("_id")]
        public string Id { get; set; }

        [JsonProperty("Name")]
        [DynamoDBProperty("Name")]
        public string ClientName { get; set; }

        [JsonProperty("Email")]
        [DynamoDBProperty("Email")]
        public string Email { get; set; }
    }
}