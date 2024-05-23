FROM public.ecr.aws/bitnami/node:10-prod
WORKDIR /app
COPY package*.json /app/

RUN npm install
COPY . /app
EXPOSE 5001
CMD node app.js
