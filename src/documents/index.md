
# Railsモノリスのテスト用アプリケーション

- [設計](./design.md)

## 実装内容

- [ツイート機能](./features/tweet.md)
- [チャット機能](./features/chat.md)

## モデル

`id`, `created_at`, `updated_at`, `discarded_at`の説明は省略しています。

- [ユーザー](./models/user.md)
  - [ユーザーツイート](./models/user_tweet.md)
- [管理者](./models/admin_user.md)

## 追加した要素

- devise
- vite
- tailwind
- activeadmin
- discard
