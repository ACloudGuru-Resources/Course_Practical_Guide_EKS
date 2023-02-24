echo "***************************************************"
echo "********* CHAPTER 2 - STARTED AT $(date) **********"
echo "***************************************************"
echo "--- This could take around 35 minutes"
#  Create the DynamoDB Tables
    ( cd ./clients-api/infra/cloudformation && ./create-dynamodb-table.sh development )
    ( cd ./inventory-api/infra/cloudformation && ./create-dynamodb-table.sh development )
    ( cd ./renting-api/infra/cloudformation && ./create-dynamodb-table.sh development )
    ( cd ./resource-api/infra/cloudformation && ./create-dynamodb-table.sh development )

# Create the Kubernetes Cluster
    eksctl create cluster -f Infrastructure/eksctl/01-initial-cluster/cluster.yaml
    nodegroup_iam_role=$(aws cloudformation list-exports --query "Exports[?contains(Name, 'nodegroup-eks-node-group::InstanceRoleARN')].Value" --output text | xargs | cut -d "/" -f 2)

# Adding DynamoDB Permissions to the node
    aws iam attach-role-policy --role-name ${nodegroup_iam_role} --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess

# Installing ExternalDNS
    ./Infrastructure/k8s-tooling/1-external-dns/create.sh
    aws iam attach-role-policy --role-name ${nodegroup_iam_role} --policy-arn arn:aws:iam::aws:policy/AmazonRoute53FullAccess

# Installing Load Balancer Controller
    ./Infrastructure/k8s-tooling/2-load-balancer-controller/create.sh
    

# Create SSL Certfiicate in ACM
     ( cd ./Infrastructure/cloudformation/ssl-certificate && ./create.sh )

echo "***************************************************"
echo "********* CHAPTER 2 - FINISHED AT $(date) *********"
echo "***************************************************"