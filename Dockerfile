FROM node:16.17.0-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

# 依存関係をインストール

# ソースコードをコピー
COPY . /app

# ビルド
RUN yarn build

# サーバーのインストール
RUN yarn global add serve

# コンテナ起動時のコマンド
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:${PORT}"]
