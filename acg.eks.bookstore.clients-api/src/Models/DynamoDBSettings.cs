namespace ACG.EKS.Bookstore.Clients_API.Models
{
    public class DynamoDBSettings : IDynamoDBSettings
    {
        public string Prefix { get; set; }
    }

    public interface IDynamoDBSettings
    {
        string Prefix { get; set; }
    }
}