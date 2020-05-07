eksctl create iamserviceaccount \
    --cluster eks-acg \
    --name clients-api-iam-service-account \
    --namespace development \
    --attach-policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess \
    --approve --override-existing-serviceaccounts

helm upgrade --install --namespace development clients-api-development .