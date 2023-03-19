FROM node:16.17.0-alpine

RUN yarn global add @vue/cli

WORKDIR /app
COPY . /app
