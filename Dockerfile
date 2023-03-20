FROM node:lts-alpine3.14

WORKDIR /app

COPY package.json yarn.lock ./

# 依存関係をインストール

# ソースコードをコピー
COPY . /app

# ビルド
RUN yarn build

# サーバーのインストール
RUN yarn global add serve

# ポートを設定
EXPOSE 8081

# コンテナ起動時のコマンド
CMD ["serve", "-s", "dist", "-l", "$PORT"]
