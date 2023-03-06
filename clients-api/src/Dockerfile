FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
COPY . /app
WORKDIR /app
RUN dotnet restore
RUN dotnet publish -c Release -o publish


FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/publish .
EXPOSE 5003
ENV ASPNETCORE_URLS "http://*:5003"
CMD dotnet ACG.EKS.Bookstore.Clients-API.dll
