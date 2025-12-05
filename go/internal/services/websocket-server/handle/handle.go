package handle

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-redis/redis/v8"

	"myapp/internal/services/websocket-server/auth"
	"myapp/internal/services/websocket-server/test"
	"myapp/internal/services/websocket-server/types"
	"myapp/internal/services/websocket-server/websocket"
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

var ctx = context.Background()

// WebSocket の接続を処理する関数
func HandleConnections(w http.ResponseWriter, r *http.Request) {
	tokenString := r.URL.Query().Get("token")

	fmt.Printf("Connection: tokenString=%s\n", tokenString)

	userID, email, channel, err := auth.AuthenticateToken(tokenString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	fmt.Printf("Connected user: ID=%d, Email=%s channel=%s\n", userID, email, channel)

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
			log.Printf("error: ReadJSON: %v", err)
			delete(clients, client)
			break
		}

		fmt.Printf("Received data: json=%s, userID=%d, email=%s\n",
			receivedData.Json, client.UserID, client.Email)

		// 0はシステムからの送信なので、それ以外の時は、Railsへのテスト送信
		if client.UserID != 0 {
			test.TestSend(client.TokenString, receivedData.Json)
		}

		// 送信用ユーザー情報に変換
		sender := types.ClientSimple{
			UserID:      client.UserID,
			Email:       client.Email,
			TokenString: client.TokenString,
			Channel:     client.Channel,
		}

		// チャネル broadcast にメッセージを送る（送信処理へ渡す）
		broadcast <- types.BroadcastPayload{
			Received: receivedData,
			Sender:   sender,
		}
	}
}

// Redis Pub/Subの処理
func RedisProcess() {
	fmt.Println("begin redisProcess")

	rdb := redis.NewClient(&redis.Options{
		Addr: "127.0.0.1:6379",
		DB:   0,
	})

	pubsub := rdb.Subscribe(ctx, "broadcast")
	defer pubsub.Close()

	ch := pubsub.Channel()
	for msg := range ch {
		// メッセージを受け取った時

		fmt.Printf("redisProcess Received: %s\n", msg.Payload)
		var redisData types.RedisReceivedData

		err := json.Unmarshal([]byte(msg.Payload), &redisData)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}

		fmt.Printf("Channel: %s, Json: %s\n", redisData.Channel, redisData.Json)

		// 送信用ユーザー情報に変換
		sender := types.ClientSimple{
			UserID:      0,
			Email:       "System (redis)",
			TokenString: "",
			Channel:     redisData.Channel,
		}

		receivedData := types.ReceivedData{
			Json: redisData.Json,
		}

		fmt.Println(sender)
		fmt.Println(receivedData)

		// チャネル broadcast にメッセージを送る（送信処理へ渡す）
		broadcast <- types.BroadcastPayload{
			Received: receivedData,
			Sender:   sender,
		}
	}
}

// メッセージを全員に送信する関数
func HandleMessages() {
	for {
		payload := <-broadcast // チャネル broadcast にメッセージが届くのを待つ（待ち受け）
		receivedData := payload.Received
		sender := payload.Sender

		fmt.Println("receivedData")
		fmt.Println(receivedData)
		fmt.Println("sender")
		fmt.Println(sender)

		for client := range clients {
			fmt.Println("client")
			fmt.Println(client)

			if sender.Channel == client.Channel {
				// チャンネルが一致する時

				fmt.Println("send")

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
					log.Printf("error: WriteJSON: %v", err)
					client.Conn.Close()
					delete(clients, client)
				}

			}
		}
	}
}
