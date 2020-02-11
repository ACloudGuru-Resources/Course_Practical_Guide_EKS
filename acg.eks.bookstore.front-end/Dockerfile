FROM node:carbon-alpine
WORKDIR /opt/forms
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.15-alpine
COPY --from=0 /opt/forms/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
