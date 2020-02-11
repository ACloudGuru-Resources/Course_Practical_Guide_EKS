FROM ruby:2.6.3

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

# CMD ["rails", "server", ]
# CMD ["bundle", "exec", "rails", "server", "-p", "3000", "-b", "'0.0.0.0'"]
CMD ["bundle", "exec", "rails", "server", "-p", "5004", "-b", "0.0.0.0"]