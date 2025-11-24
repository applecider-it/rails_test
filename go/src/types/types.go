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
// 受信：{ "message": "hello" }
//
// 送信：{ "message": "hello", user_id: 1, email: "test@example.com" }
type Message struct {
	Message string `json:"message"` // メッセージ本文
	UserID  int    `json:"user_id"` // 送信者のID
	Email   string `json:"email"`   // 送信者のメールアドレス
}
