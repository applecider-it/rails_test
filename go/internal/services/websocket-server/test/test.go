package test

import (
	"fmt"
	"myapp/internal/services/websocket-server/http"
)

// railsへのAPIのテスト送信
func TestSend(tokenString string, msg string) {
	result, err := http.PostToRails("/api/development/go_api_test", tokenString, map[string]string{
		"title":          "hello from Go",
		"sender_message": msg,
	})
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Status From Rails:", result.Status)

	if result.Status == "OK" {
		fmt.Println("OK process")
	}
}
