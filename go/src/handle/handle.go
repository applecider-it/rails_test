package handle

import (
	"fmt"
	"log"
	"net/http"

	"myapp/src/auth"
	"myapp/src/test"
	"myapp/src/types"
	"myapp/src/websocket"
)

// 参加中のクライアントを保存する変数
//
// 接続している WebSocket オブジェクトを map で管理。
// bool は使っていないが、値をセットできるために使っているだけ（セットの代わり）。
var clients = make(map[*types.Client]bool)

// メッセージを送るためのチャネル
//
// 誰かから受け取ったメッセージを「全員に送る」ための通信用チャネル。
var broadcast = make(chan types.Message)

// WebSocket の接続を処理する関数
func HandleConnections(w http.ResponseWriter, r *http.Request) {
	// JWT トークンを取得
	tokenString := r.URL.Query().Get("token")

	fmt.Printf("Connection: tokenString=%s\n", tokenString)

	userID, email, err := auth.AuthenticateToken(tokenString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	fmt.Printf("Connected user: ID=%d, Email=%s\n", userID, email)

	ws, err := websocket.Upgrader.Upgrade(w, r, nil) // WebSocketへ変換
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	// 接続ユーザー情報を保存
	client := &types.Client{
		Conn:        ws,
		UserID:      userID,
		Email:       email,
		TokenString: tokenString,
	}
	clients[client] = true

	// 永久ループで WebSocket からデータを受け取る。
	for {
		var msg types.Message
		err := ws.ReadJSON(&msg) // JSONが届くのを待つ（待ち受け）
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, client)
			break
		}

		// 送信者情報をセット
		msg.UserID = client.UserID
		msg.Email = client.Email

		fmt.Printf("Received message: message=%s, userID=%d, email=%s\n",
			msg.Message, msg.UserID, msg.Email)

		test.TestSend(client.TokenString)

		broadcast <- msg // チャネル broadcast にメッセージを送る（送信処理へ渡す）。
	}
}

// メッセージを全員に送信する関数
func HandleMessages() {
	for {
		msg := <-broadcast // チャネル broadcast にメッセージが届くのを待つ（待ち受け）
		for client := range clients {
			err := client.Conn.WriteJSON(msg) // 接続中の全 WebSocket クライアントに送信する。
			if err != nil {
				log.Printf("error: %v", err)
				client.Conn.Close()
				delete(clients, client)
			}
		}
	}
}
