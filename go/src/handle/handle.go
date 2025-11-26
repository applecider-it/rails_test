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
var broadcast = make(chan types.BroadcastPayload)

// WebSocket の接続を処理する関数
func HandleConnections(w http.ResponseWriter, r *http.Request) {
	tokenString := r.URL.Query().Get("token")
	channel := r.URL.Query().Get("channel")

	fmt.Printf("Connection: tokenString=%s channel=%s\n", tokenString, channel)

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
		Channel:     channel,
	}
	clients[client] = true

	// 永久ループで WebSocket からデータを受け取る。
	for {
		var receivedData types.ReceivedData
		err := ws.ReadJSON(&receivedData) // JSONが届くのを待つ（待ち受け）
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, client)
			break
		}

		fmt.Printf("Received data: json=%s, userID=%d, email=%s\n",
			receivedData.Json, client.UserID, client.Email)

		test.TestSend(client.TokenString, receivedData.Json)

		// チャネル broadcast にメッセージを送る（送信処理へ渡す）
		broadcast <- types.BroadcastPayload{
			Received: receivedData,
			Client:   client,
		}
	}
}

// メッセージを全員に送信する関数
func HandleMessages() {
	for {
		payload := <-broadcast // チャネル broadcast にメッセージが届くのを待つ（待ち受け）
		receivedData := payload.Received
		sender := payload.Client
		for client := range clients {
			if sender.Channel == client.Channel {
				// チャンネルが一致する時

				// 接続中の全 WebSocket クライアントに送信する。
				//
				// 送信内容
				//{
				//	data: {
				//		json: receivedData.Json
				//	},
				//	sender: {
				//		user_id: sender.UserID,
				//		email: sender.Email,
				//	},
				//}
				err := client.Conn.WriteJSON(struct {
					Data struct {
						Json string `json:"json"`
					} `json:"data"`
					Sender struct {
						UserID int    `json:"user_id"`
						Email  string `json:"email"`
					} `json:"sender"`
				}{
					Data: struct {
						Json string `json:"json"`
					}{
						Json: receivedData.Json,
					},
					Sender: struct {
						UserID int    `json:"user_id"`
						Email  string `json:"email"`
					}{
						UserID: sender.UserID,
						Email:  sender.Email,
					},
				})

				if err != nil {
					log.Printf("error: %v", err)
					client.Conn.Close()
					delete(clients, client)
				}

			}
		}
	}
}
