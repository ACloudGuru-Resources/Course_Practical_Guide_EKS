helm repo add eks https://aws.github.io/eks-charts
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=eks-acg \
  --set serviceAccount.create=true

aws cloudformation deploy \
    --stack-name aws-load-balancer-iam-policy \
    --template-file iam-policy.yaml