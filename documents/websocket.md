# websocket連携

## 独自実装

websocketはgoで連携する。

Railsと双方向APIで連携。

認証はJWTを使う。

## ActionCable

一部は、ActionCableで実装している。

## チャンネル名の定義

`channelname:param1,param2...`

## コネクション時のパラメーター

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| token | 認証情報を含むJWTトークン | string |  |

## token

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| user_id | ユーザーID | integer |  |
| email | メールアドレス | string |  |
| channel | 接続するチャンネル | string | つまり、同時に複数のチャンネルには接続できない。 |
| exp | 有効期限 | integer |  |
| iat | 現在日時 | integer |  |

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
  user_id: integer,
}
```


## ブロードキャスト時

```
{
  data: {
    json: string
  },
  sender: {
    user_id: int, <- システムからの送信は 0
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

## ActionCableブロードキャスト時

### チャット

```
{
  message: string,
  user_id: integer,
  email: string,
}
```



