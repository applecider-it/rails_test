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

	ha "myapp/internal/handle"
	"myapp/internal/system"
)

// main 関数
func main() {
	system.SetupApp()

	// Gorilla Mux でルーティング
	router := mux.NewRouter()

	setupRoute(router)
	startGoroutines()

	fmt.Println("Server started on :3030")
	log.Fatal(http.ListenAndServe(":3030", router)) // サーバー起動（3030番で待ち受け）
}

// ルート設定
func setupRoute(router *mux.Router) {
	router.HandleFunc("/ws", ha.HandleConnections) // /ws にアクセスされたら WebSocket 接続
}

// ゴルーチン開始
func startGoroutines() {
	go ha.HandleMessages() // メッセージ配信処理を 別ゴルーチンで並列に実行
}
