package http

import (
	"encoding/json"
	"fmt"
	"myapp/internal/config"
)

// Railsからのレスポンス
type ApiResponse struct {
	Status string `json:"status"`
}

// Rails API に POST 送信して結果を返す共通関数
func PostToRails(path, token string, payload interface{}, cfg *config.Config) (*ApiResponse, error) {
	railsHost := cfg.RailsHost
	if railsHost == "" {
		return nil, fmt.Errorf("APP_RAILS_HOST is not set")
	}

	url := railsHost + path

	body, err := PostWithAuth(url, token, payload)

	if err != nil {
		return nil, err
	}

	var result ApiResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}

	return &result, nil
}
