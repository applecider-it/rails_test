package types

import (
	"github.com/gorilla/websocket"
)

// WebSocket 接続情報とユーザー情報をまとめて保存
type Client struct {
	Conn        *websocket.Conn
	UserID      int
	Email       string
	TokenString string
}

// メッセージの型定義
//
// JSON で受け取り・送信するためのデータ形式。
//
// 例：{ "message": "hello" }
type Message struct {
	Message string `json:"message"` // メッセージ本文
}

// ブロードキャスト用
type BroadcastPayload struct {
	Msg    Message
	Client *Client
}
