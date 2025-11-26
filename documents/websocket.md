# websocket連携

websocketはgoで連携する。

認証はJWTを使う。

## コネクション時のパラメーター

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| token | 認証情報を含むJWTトークン | string |  |

## token

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| user_id | ユーザーID | integer |  |
| email | メールアドレス | string |  |
| exp | 有効期限 | integer |  |

## メッセージ送信時

```
{
  message: string,
}
```

## ブロードキャスト時

```
{
  data: {
    message: string
  },
  sender: {
    user_id: int,
    email: string
  }
}
```



