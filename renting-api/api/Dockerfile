FROM public.ecr.aws/bitnami/ruby:2.6.6 as builder
COPY . /app
WORKDIR /app
RUN bundle config set deployment 'true'
RUN bundle install

FROM public.ecr.aws/bitnami/ruby:2.6.6-prod
COPY --from=builder /app /app
WORKDIR /app

CMD ["bundle", "exec", "rails", "server", "-p", "5004", "-b", "0.0.0.0"]
