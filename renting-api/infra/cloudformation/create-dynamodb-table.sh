namespace=$1

if [ -z "${namespace}" ]
then
    echo "Missing the 'Namespace' parameter. Taking the default one which is 'development'"
    namespace="development"
fi

aws cloudformation deploy \
    --stack-name ${namespace}-renting-api-dynamodb-table \
    --template-file dynamodb-table.yaml \
    --parameter-overrides \
        Namespace=${namespace}
