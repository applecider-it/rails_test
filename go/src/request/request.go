package request

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

type ApiResponse struct {
	Status string `json:"status"`
}

// Rails API に POST 送信して結果を返す共通関数
func PostToRails(path, token string, payload interface{}) (*ApiResponse, error) {
	railsHost := os.Getenv("APP_RAILS_HOST")
	if railsHost == "" {
		return nil, fmt.Errorf("APP_RAILS_HOST is not set")
	}

	// JSONに変換
	jsonBytes, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(
		"POST",
		"http://"+railsHost+path,
		bytes.NewBuffer(jsonBytes),
	)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var result ApiResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	return &result, nil
}
