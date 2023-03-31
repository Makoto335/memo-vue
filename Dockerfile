FROM node:16.17.0-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . /app
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s", "dist", "-l", "8080"]
