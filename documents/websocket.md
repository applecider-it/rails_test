# websocket連携

websocketはgoで連携する。

Railsと双方向APIで連携。

認証はJWTを使う。

## コネクション時のパラメーター

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| token | 認証情報を含むJWTトークン | string |  |
| channel | 接続するチャンネル | string | つまり、同時に複数のチャンネルには接続できない。 |

## token

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| user_id | ユーザーID | integer | システムからの接続は`0` |
| email | メールアドレス | string |  |
| exp | 有効期限 | integer |  |

## メッセージ送信時

```
{
  json: string,
}
```

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| json | Jsonデータ | string | 各チャンネルごとに別々の値が入る |

### チャットの場合のjsonをパースした状態

```
{
  message: string,
}
```

### Tweetの場合のjsonをパースした状態

```
{
  content: string,
}
```


## ブロードキャスト時

```
{
  data: {
    json: string
  },
  sender: {
    user_id: int,
    email: string
  }
}
```

## Redis Pub/Sub連携

Pub/Subのチャンネル名: broadcast

```
{
  channel: string, <- WebSocketチャンネル名
  json: string, <- 上記の、「メッセージ送信時」のjsonの部分

}
```



