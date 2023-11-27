# Use a base image that includes Node.js
FROM node:16-alpine

WORKDIR /opt/forms
COPY package.json ./

# Install Python 3 and other dependencies
# RUN apk add --no-cache python3 g++ make

# Clear npm cache and install dependencies with increased timeout and legacy peer deps
RUN npm install --loglevel verbose --fetch-timeout=300000 --legacy-peer-deps

COPY . ./
RUN npm run build

# Use nginx to serve the application
FROM nginx:1.15-alpine
COPY --from=0 /opt/forms/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
