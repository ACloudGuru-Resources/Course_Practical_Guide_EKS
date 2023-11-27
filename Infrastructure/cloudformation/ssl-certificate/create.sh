#!/bin/bash
domain_name=$(aws route53 list-hosted-zones --query "HostedZones[0].Name" --output text | xargs | sed 's/.$//')
hosted_zone_id=$(aws route53 list-hosted-zones --query "HostedZones[0].Id" --output text | xargs | tr -d '/hostedzone/')

aws cloudformation deploy \
    --stack-name ssl-certificate \
    --template-file acm.yaml \
    --parameter-overrides \
        DomainName=${domain_name} \
        HostedZoneId=${hosted_zone_id}

