package test

import (
	"fmt"
	"myapp/src/request"
)

// railsへのAPIのテスト送信
func TestSend(tokenString string, msg string) {
	result, err := request.PostToRails("/api/development/go_api_test", tokenString, map[string]string{
		"title":          "hello from Go",
		"sender_message": msg,
	})
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println("Status:", result.Status)

	if result.Status == "OK" {
		fmt.Println("OK process")
	}
}
