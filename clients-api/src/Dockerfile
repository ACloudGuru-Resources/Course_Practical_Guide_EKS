FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env

# Update and install SSL certificates
RUN apt-get update && apt-get install -y ca-certificates

COPY . /app
WORKDIR /app

# Run dotnet restore with verbose output
RUN dotnet restore --verbosity detailed

RUN dotnet publish -c Release -o publish

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/publish .
EXPOSE 5003
ENV ASPNETCORE_URLS "http://*:5003"
CMD dotnet ACG.EKS.Bookstore.Clients-API.dll
