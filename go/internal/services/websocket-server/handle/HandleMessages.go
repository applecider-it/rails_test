package handle

import (
	"fmt"
	"log"
)

// メッセージを全員に送信する関数
func HandleMessagesMain(h *WSHandler) {
	for {
		payload := <-h.Broadcast // チャネル broadcast にメッセージが届くのを待つ（待ち受け）
		receivedData := payload.Received
		sender := payload.Sender

		fmt.Println("receivedData")
		fmt.Println(receivedData)
		fmt.Println("sender")
		fmt.Println(sender)

		for client := range h.Clients {
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
					delete(h.Clients, client)
				}

			}
		}
	}
}
