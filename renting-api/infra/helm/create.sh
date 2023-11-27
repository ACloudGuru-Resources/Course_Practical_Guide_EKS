base_domain=$(aws route53 list-hosted-zones --query "HostedZones[0].Name" --output text | rev | cut -c2- | rev)

helm upgrade --install \
    --namespace development \
    --create-namespace \
    --set baseDomain=${base_domain} \
    renting-api-development .