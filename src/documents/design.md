# 設計

フロントエンドアーキテクチャは、Laravelと同じように、vite, tailwind。

MVCSにして、ビジネスロジックは、カテゴリーごとにフォルダを分けたサービスクラスにまとめている。

javascriptを使わないでtypescriptだけ利用している。

## 通常のRails以外の構成

```
app/
  admin/ <- activeadmin関連
  controllers/
    users/ <- devise関連
    tweets_controller.rb <- user_tweets_controller.rbにしないで、Tweetというドメインを表すようにしている。
  javascript/
    entrypoints/ <- vite_railsのエントリーポイント
    services/ <- ビジネスロジックなど
      (カテゴリーごとにディレクトリを分けて、そのなかにサービスクラスを配置している)
  services/ <- ビジネスロジックなど
    (カテゴリーごとにディレクトリを分けて、そのなかにサービスクラスを配置している)
    sample_services/ <- サービスクラス実装例
    .
    .
    .
  views/
    admin/ <- activeadminから呼ぶpartial
    kaminari/ <- paginationファイル
    users/ <- devise関連
    .
    .
    .
  config/
    vite.json <- vite_rails設定ファイル
    .
    .
    .

documents/ <- Railsモノリス固有のドキュメント

(foreman用ファイル)
Procfile.dev
Procfile.prod

(フロントエンド関連の設定ファイル)
postcss.config.js
tailwind.config.js
tsconfig.json
vite.config.ts
```

## Rubyのサービスクラスの命名規則

モジュール名、クラス名の衝突を避けるため、カテゴリーごとのディレクトリには`_services`、サービスクラスには`_service`をポストフィックスにしている。

## Railswayじゃない部分

モデルはDB構成に連動させるべきですが、コントローラーはドメインの区切りに合わせるべきなので、user_tweets_controller.rbにしないで、tweets_controller.rbにして、UserTweetモデルとの連動を断っています。

フロントエンドは、viteを使うほうがいいので、importmapは使っていません。

ビジネスロジックは、コントローラーやモデルに書かないで、サービスクラスにまとめています。
