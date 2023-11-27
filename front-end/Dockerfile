# Use a base image that includes Python
FROM node:carbon-alpine

WORKDIR /opt/forms
COPY package*.json ./

# Install Python and other dependencies
RUN apk add --no-cache python2 g++ make

# Clear npm cache and install dependencies
RUN npm cache clean --force
RUN npm install --loglevel verbose

COPY . ./
RUN npm run build

FROM nginx:1.15-alpine
COPY --from=0 /opt/forms/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
