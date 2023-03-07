namespace=$1

if [ -z "${namespace}" ]
then
    echo "Missing the 'Namespace' parameter. Taking the default one which is 'development'"
    namespace="development"
fi

base_domain=$(aws route53 list-hosted-zones --query "HostedZones[0].Name" --output text | rev | cut -c2- | rev)

helm upgrade --install \
    --namespace development \
    --create-namespace \
    --set baseDomain=${base_domain} \
    -f values.yaml -f values.${namespace}.yaml \
    front-end-development --debug --dry-run .