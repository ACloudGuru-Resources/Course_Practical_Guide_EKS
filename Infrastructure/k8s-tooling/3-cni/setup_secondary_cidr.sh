cluster_stack_name="eksctl-eks-acg-cluster"
region="us-east-2"
cluster_name="eks-acg"
secondary_cidr="100.64.0.0/16"
subnet_a_cidr="100.64.0.0/19"
subnet_b_cidr="100.64.32.0/19"
subnet_c_cidr="100.64.64.0/19"

vpc_id=`aws cloudformation describe-stack-resources --stack-name ${cluster_stack_name} --query "StackResources[?LogicalResourceId=='VPC'].PhysicalResourceId" --output text`
aws ec2 associate-vpc-cidr-block --vpc-id ${vpc_id} --cidr-block ${secondary_cidr}
sleep 5

nat_gateway_id=`aws ec2 describe-nat-gateways --query "NatGateways[?VpcId=='${vpc_id}'].NatGatewayId" --output text`

aws cloudformation deploy \
    --stack-name secondary-subnets \
    --template-file subnets.json \
    --parameter-overrides \
        Region=${region} \
        VPCID=${vpc_id} \
        EKSClusterName=${cluster_name} \
        SubnetACidr=${subnet_a_cidr} \
        SubnetBCidr=${subnet_b_cidr} \
        SubnetCCidr=${subnet_c_cidr} \
        NATGatewayId=${nat_gateway_id}