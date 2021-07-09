FROM public.ecr.aws/bitnami/node:8 as builder
WORKDIR /app
COPY package*.json /app/
RUN npm --unsafe-perm install
COPY . /app
RUN npm run build

FROM public.ecr.aws/nginx/nginx:1.18-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
