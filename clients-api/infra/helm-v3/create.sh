namespace=$1

if [ -z "${namespace}" ]
then
    echo "Missing the 'Namespace' parameter. Taking the default one which is 'development'"
    namespace="development"
fi

if [ "${namespace}" == "prod" ]
then
    ASPNETCORE_ENVIRONMENT=Production
else 
    ASPNETCORE_ENVIRONMENT=Development
fi

helm upgrade --install --namespace ${namespace} clients-api-${namespace} --set aspnet.environment=${ASPNETCORE_ENVIRONMENT} .