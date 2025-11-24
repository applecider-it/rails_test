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
	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/joho/godotenv"
)

// WebSocket 接続情報とユーザー情報をまとめて保存
type Client struct {
	Conn   *websocket.Conn
	UserID int
	Email  string
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

// WebSocket 関係の設定
//
// HTTP 通信を WebSocket に“アップグレード”するための設定。
//
// CheckOrigin で true を返しているので、どこからの接続でも許可（開発用）。
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

// 参加中のクライアントを保存する変数
//
// 接続している WebSocket オブジェクトを map で管理。
// bool は使っていないが、値をセットできるために使っているだけ（セットの代わり）。
var clients = make(map[*Client]bool)

// メッセージを送るためのチャネル
//
// 誰かから受け取ったメッセージを「全員に送る」ための通信用チャネル。
var broadcast = make(chan Message)

// サーバー側で共有する秘密鍵
var jwtSecret []byte

// JWTトークンを検証して userID と email を返す
func authenticateToken(tokenString string) (int, string, error) {
	if tokenString == "" {
		return 0, "", fmt.Errorf("token required")
	}

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return 0, "", fmt.Errorf("invalid token")
	}

	// トークンからデータを取り出す
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return 0, "", fmt.Errorf("invalid claims")
	}

	// user_id は float64 で来るので int に変換
	userIDFloat, ok := claims["user_id"].(float64)
	if !ok {
		return 0, "", fmt.Errorf("invalid user_id in token")
	}
	userID := int(userIDFloat)

	email, ok := claims["email"].(string)
	if !ok {
		return 0, "", fmt.Errorf("invalid email in token")
	}

	return userID, email, nil
}

// WebSocket の接続を処理する関数
func handleConnections(w http.ResponseWriter, r *http.Request) {
	// JWT トークンを取得
	tokenString := r.URL.Query().Get("token")

	fmt.Printf("Connection: tokenString=%s\n", tokenString)

	userID, email, err := authenticateToken(tokenString)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	fmt.Printf("Connected user: ID=%d, Email=%s\n", userID, email)

	ws, err := upgrader.Upgrade(w, r, nil) // WebSocketへ変換
	if err != nil {
		log.Fatal(err)
	}
	defer ws.Close()

	// 接続ユーザー情報を保存
	client := &Client{
		Conn:   ws,
		UserID: userID,
		Email:  email,
	}
	clients[client] = true

	// 永久ループで WebSocket からデータを受け取る。
	for {
		var msg Message
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

		broadcast <- msg // チャネル broadcast にメッセージを送る（送信処理へ渡す）。
	}
}

// メッセージを全員に送信する関数
func handleMessages() {
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

// main 関数
func main() {
	// .env を読み込む
	if err := godotenv.Load(); err != nil {
		log.Println(".env file not found, using system environment variables")
	}

	jwtSecret = []byte(os.Getenv("APP_JWT_SECRET"))
	if len(jwtSecret) == 0 {
		log.Fatal("APP_JWT_SECRET is not set")
	}

	// Gorilla Mux でルーティング
	router := mux.NewRouter()
	router.HandleFunc("/ws", handleConnections) // /ws にアクセスされたら WebSocket 接続

	go handleMessages() // メッセージ配信処理を 別ゴルーチンで並列に実行

	fmt.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", router)) // サーバー起動（8080番で待ち受け）
}
