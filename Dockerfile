FROM alpine:edge

ENV RUBY_MAJOR 2.5
ENV RUBY_VERSION 2.5.1

RUN rm -rf /usr/lib/ruby
RUN apk update && apk --update --no-cache add 'ruby=2.5.1-r2' ruby-bigdecimal ruby-bundler \
    ruby-io-console ruby-irb ca-certificates less libstdc++

RUN apk --update add --virtual build-dependencies build-base openssl-dev \
    libc-dev linux-headers ruby-dev 
RUN apk upgrade

COPY ./ /app
WORKDIR /app

RUN gem cleanup
RUN gem update --system --no-ri --no-rdoc
RUN gem install json --no-rdoc --no-ri
RUN gem install bundler --force --no-ri --no-rdoc
RUN bundle config --global silence_root_warning 1
RUN cd /app ; bundle install && \
    apk del build-dependencies
RUN gem cleanup

ENV PORT 8080
EXPOSE 8080
CMD ["unicorn", "-Ilib", "-p", "8080"]
