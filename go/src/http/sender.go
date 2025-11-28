package http

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
)

// 認証付きでPOST送信
func PostWithAuth(url, token string, payload interface{}) ([]byte, error) {

	// JSONに変換
	jsonBytes, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(
		"POST",
		"http://"+url,
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

	return body, nil
}
