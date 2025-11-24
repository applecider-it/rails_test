package test

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

// railsへのAPIのテスト送信
func TestSend(tokenString string) {
	fmt.Printf("testSend: %s", tokenString)

	var railsHost []byte = []byte(os.Getenv("APP_RAILS_HOST"))

	// 送信するデータ
	jsonData := []byte(`{"message":"hello from Go"}`)

	req, err := http.NewRequest("POST", "http://"+string(railsHost)+"/api/development/go_api_test", bytes.NewBuffer(jsonData))
	if err != nil {
		panic(err)
	}

	req.Header.Set("Content-Type", "application/json")

	// JWTトークンを Authorization ヘッダに設定
	token := tokenString
	req.Header.Set("Authorization", "Bearer "+token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		// エラー処理
	}
	fmt.Println("Status:", resp.Status)
	fmt.Println("Response:", string(body))

	// JSON を構造体にパース
	var result struct {
		Status string `json:"status"`
	}

	if err := json.Unmarshal(body, &result); err != nil {
		panic(err)
	}

	fmt.Println("Status:", result.Status) // → OK

	if result.Status == "OK" {
		fmt.Println("OK proccess")
	}
}
