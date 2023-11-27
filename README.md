# A Practical Guide to EKS

In this repository you will find all the assets required for the course `A Practical Guide to Amazon EKS`, by A Cloud Guru.


## Bookstore application

This solution has been built for for explaining all the concepts in this course. It is complete enough for covering a real case of microservices running on EKS and integrating with other AWS Services.

> You can find in [here](_docs/api.md) the documentation of the APIs.

# Build each image first
```
$ cd renting-api/api/ 

$ docker build -t renting-api-image .

## OUTPUT 
$ docker build -t renting-api-image .
[+] Building 148.0s (11/11) FINISHED
 => [internal] load build definition from Dockerfile                                                                          0.0s
 => => transferring dockerfile: 283B                                                                                          0.0s
 => [internal] load .dockerignore                                                                                             0.0s
 => => transferring context: 2B                                                                                               0.0s
 => [internal] load metadata for docker.io/library/ruby:2.6.3                                                                 0.7s
 => [auth] library/ruby:pull token for registry-1.docker.io                                                                   0.0s
 => [1/5] FROM docker.io/library/ruby:2.6.3@sha256:358f16e92d0f66599103318f7a8528d449b0973fd89e46a1a5c47cec7479f09b           0.0s
 => [internal] load build context                                                                                             0.0s
 => => transferring context: 3.65kB                                                                                           0.0s
 => CACHED [2/5] WORKDIR /usr/src/app                                                                                         0.0s
 => CACHED [3/5] COPY Gemfile Gemfile.lock ./                                                                                 0.0s
 => [4/5] RUN bundle install                                                                                                145.4s
 => [5/5] COPY . .                                                                                                            0.1s
 => exporting to image                                                                                                        1.7s
 => => exporting layers                                                                                                       1.7s
 => => writing image sha256:9359280ad31cd84280a1b4c74e073e918ebe9e5d0b92d78368fa336c3c0c8d24                                  0.0s
 => => naming to docker.io/library/renting-api-image                                                                          0.0s


$ docker build -t inventory-api-image .
[+] Building 41.0s (11/11) FINISHED
 => [internal] load .dockerignore                                                                                             0.0s
 => => transferring context: 2B                                                                                               0.0s
 => [internal] load build definition from Dockerfile                                                                          0.0s
 => => transferring dockerfile: 153B                                                                                          0.0s
 => [internal] load metadata for docker.io/library/node:16-alpine                                                             0.8s
 => [auth] library/node:pull token for registry-1.docker.io                                                                   0.0s
 => [1/5] FROM docker.io/library/node:16-alpine@sha256:a1f9d027912b58a7c75be7716c97cfbc6d3099f3a97ed84aa490be9dee20e787      24.6s
 => => resolve docker.io/library/node:16-alpine@sha256:a1f9d027912b58a7c75be7716c97cfbc6d3099f3a97ed84aa490be9dee20e787       0.0s
 => => sha256:93b3025fe10392717d06ec0d012a9ffa2039d766a322aac899c6831dd93382c2 2.34MB / 2.34MB                                4.3s
 => => sha256:a1f9d027912b58a7c75be7716c97cfbc6d3099f3a97ed84aa490be9dee20e787 1.43kB / 1.43kB                                0.0s
 => => sha256:72e89a86be58c922ed7b1475e5e6f151537676470695dd106521738b060e139d 1.16kB / 1.16kB                                0.0s
 => => sha256:2573171e0124bb95d14d128728a52a97bb917ef45d7c4fa8cfe76bc44aa78b73 6.73kB / 6.73kB                                0.0s
 => => sha256:7264a8db6415046d36d16ba98b79778e18accee6ffa71850405994cffa9be7de 3.40MB / 3.40MB                                4.2s
 => => sha256:eee371b9ce3ffdbb8aa703b9a14d318801ddc3468f096bb6cfeabbeb715147f9 36.63MB / 36.63MB                             22.2s
 => => extracting sha256:7264a8db6415046d36d16ba98b79778e18accee6ffa71850405994cffa9be7de                                     0.1s
 => => sha256:d9059661ce70092af66d2773666584fc8addcb78a2be63f720022f4875577ea9 452B / 452B                                    4.4s
 => => extracting sha256:eee371b9ce3ffdbb8aa703b9a14d318801ddc3468f096bb6cfeabbeb715147f9                                     2.0s
 => => extracting sha256:93b3025fe10392717d06ec0d012a9ffa2039d766a322aac899c6831dd93382c2                                     0.1s
 => => extracting sha256:d9059661ce70092af66d2773666584fc8addcb78a2be63f720022f4875577ea9                                     0.0s
 => [internal] load build context                                                                                             0.0s
 => => transferring context: 187B                                                                                             0.0s
 => [2/5] WORKDIR /usr/src/app                                                                                                0.3s
 => [3/5] COPY package*.json ./                                                                                               0.0s
 => [4/5] RUN npm install                                                                                                    14.5s
 => [5/5] COPY . .                                                                                                            0.0s
 => exporting to image                                                                                                        0.7s
 => => exporting layers                                                                                                       0.7s
 => => writing image sha256:511ef81f3d085ab7ec01f7e071154a402548c6e32aef7d297d93ff441da5702a                                  0.0s
 => => naming to docker.io/library/inventory-api-image                                                                        0.0s


$ docker build -t clients-api-image .
[+] Building 0.6s (15/15) FINISHED
 => [internal] load build definition from Dockerfile                                                                          0.0s
 => => transferring dockerfile: 531B                                                                                          0.0s
 => [internal] load .dockerignore                                                                                             0.0s
 => => transferring context: 47B                                                                                              0.0s
 => [internal] load metadata for mcr.microsoft.com/dotnet/core/aspnet:3.1                                                     0.5s
 => [internal] load metadata for mcr.microsoft.com/dotnet/core/sdk:3.1                                                        0.5s
 => [build-env 1/6] FROM mcr.microsoft.com/dotnet/core/sdk:3.1@sha256:150d074697d1cda38a0c2185fe43895d84b5745841e9d15c5adba2  0.0s
 => [stage-1 1/3] FROM mcr.microsoft.com/dotnet/core/aspnet:3.1@sha256:e3b773f30a0a6e88d71ce52429f6847627fc9353e491346902ca3  0.0s
 => [internal] load build context                                                                                             0.0s
 => => transferring context: 20.50kB                                                                                          0.0s
 => CACHED [stage-1 2/3] WORKDIR /app                                                                                         0.0s
 => CACHED [build-env 2/6] RUN apt-get update && apt-get install -y ca-certificates                                           0.0s
 => CACHED [build-env 3/6] COPY . /app                                                                                        0.0s
 => CACHED [build-env 4/6] WORKDIR /app                                                                                       0.0s
 => CACHED [build-env 5/6] RUN dotnet restore --verbosity detailed                                                            0.0s
 => CACHED [build-env 6/6] RUN dotnet publish -c Release -o publish                                                           0.0s
 => CACHED [stage-1 3/3] COPY --from=build-env /app/publish .                                                                 0.0s
 => exporting to image                                                                                                        0.0s
 => => exporting layers                                                                                                       0.0s
 => => writing image sha256:155f6cc40347448fb775213a1bff0c3fb77f77d120704cf4e4ca73a3b2c9fbda                                  0.0s
 => => naming to docker.io/library/clients-api-image                                                                          0.0s


$ docker build -t resource-api-image .
[+] Building 1.4s (10/10) FINISHED
 => [internal] load .dockerignore                                                                                             0.0s
 => => transferring context: 2B                                                                                               0.0s
 => [internal] load build definition from Dockerfile                                                                          0.0s
 => => transferring dockerfile: 223B                                                                                          0.0s
 => [internal] load metadata for docker.io/library/python:3                                                                   1.3s
 => [auth] library/python:pull token for registry-1.docker.io                                                                 0.0s
 => [1/4] FROM docker.io/library/python:3@sha256:31ceea009f42df76371a8fb94fa191f988a25847a228dbeac35b6f8d2518a6ef             0.0s
 => [internal] load build context                                                                                             0.0s
 => => transferring context: 10.93kB                                                                                          0.0s
 => CACHED [2/4] ADD requirements.txt requirements.txt                                                                        0.0s
 => CACHED [3/4] RUN pip install -r requirements.txt                                                                          0.0s
 => CACHED [4/4] ADD . /                                                                                                      0.0s
 => exporting to image                                                                                                        0.0s
 => => exporting layers                                                                                                       0.0s
 => => writing image sha256:941df58b088e97f2aeff449334dd7551c3a7a09a47cd462f35faf38367e1fc52                                  0.0s
 => => naming to docker.io/library/resource-api-image                                                                         0.0s
 


```