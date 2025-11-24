/*
このプログラムがやっていること

・Go で WebSocket サーバーを立てる
・ブラウザなどから WebSocket 接続されたユーザー全員を管理し
・誰かが送ったメッセージを全員に配信（チャット）できるようにする
*/

package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

/*
WebSocket 関係の設定

HTTP 通信を WebSocket に“アップグレード”するための設定。

CheckOrigin で true を返しているので、どこからの接続でも許可（開発用）。
*/
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

/*
参加中のクライアントを保存する変数

接続している WebSocket オブジェクトを map で管理。
bool は使っていないが、値をセットできるために使っているだけ（セットの代わり）。
*/
var clients = make(map[*websocket.Conn]bool)

/*
メッセージを送るためのチャネル

誰かから受け取ったメッセージを「全員に送る」ための通信用チャネル。
*/
var broadcast = make(chan Message)

/*
メッセージの型定義

JSON で受け取り・送信するためのデータ形式。
例：{ "username": "test", "message": "hello" }
*/
type Message struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

/*
WebSocket の接続を処理する関数
*/
func handleConnections(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil) // WebSocketへ変換
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	clients[ws] = true // 接続したクライアントを保存。

	// 永久ループで WebSocket からデータを受け取る。
	for {
		var msg Message
		err := ws.ReadJSON(&msg) // JSONが届くのを待つ（待ち受け）
		if err != nil {
			log.Printf("error: %v", err)
			delete(clients, ws)
			break
		}

		fmt.Printf("Received message: username=%s, message=%s\n", msg.Username, msg.Message)

		broadcast <- msg // チャネル broadcast にメッセージを送る（送信処理へ渡す）。
	}
}

/*
メッセージを全員に送信する関数
*/
func handleMessages() {
	for {
		msg := <-broadcast // チャネル broadcast にメッセージが届くのを待つ（待ち受け）
		for client := range clients {
			err := client.WriteJSON(msg) // 接続中の全 WebSocket クライアントに送信する。
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}

/*
main 関数
*/
func main() {
	// Gorilla Mux でルーティング
	router := mux.NewRouter()
	router.HandleFunc("/ws", handleConnections) // /ws にアクセスされたら WebSocket 接続

	go handleMessages() // メッセージ配信処理を 別ゴルーチンで並列に実行

	fmt.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", router)) // サーバー起動（8080番で待ち受け）
}
