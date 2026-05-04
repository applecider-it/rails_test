# Pusher(soketi)

一部は、Pusher(soketi)で実装している。

soketiは、`laravel-app`のWebサーバーを起動する必要がある。

## Pusherブロードキャスト時

### チャット

メッセージ名: `new-message`

```
{
  message: string,
  user_id: integer,
  email: string,
}
```
