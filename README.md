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
```