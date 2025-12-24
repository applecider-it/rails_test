package config

import (
	"os"
	"strconv"
)

// アプリケーションの設定
type Config struct {
	WebSocket WebSocketConfig
	Push      PushConfig
	JwtSecret string
	Redis     RedisConfig
	RailsHost string
	// ブロードキャスト用Redis pub/subチャンネル
	RedisPubSubChannel string
	// WebSocket RedisのシステムのEMAIL
	WsRedisSystemEmail string
}

// WebSocket設定
type WebSocketConfig struct {
	Url string
}

// Push通知設定
type PushConfig struct {
	PublicKey  string
	PrivateKey string
	RedisKey   string
	Mailto     string
}

// Redis設定
type RedisConfig struct {
	Addr string
	DB   int
}

// アプリケーションの設定を返す
func Load() *Config {
	redisDB, _ := strconv.Atoi(os.Getenv("APP_REDIS_DB"))

	return &Config{
		WebSocket: WebSocketConfig{
			Url: ":3030",
		},

		Push: PushConfig{
			PublicKey:  os.Getenv("APP_VAPID_PUBLIC_KEY"),
			PrivateKey: os.Getenv("APP_VAPID_PRIVATE_KEY"),
			RedisKey:   "laravel-test-database-push_queue",
			Mailto:     "you@example.com",
		},

		JwtSecret: os.Getenv("APP_JWT_SECRET"),

		Redis: RedisConfig{
			Addr: os.Getenv("APP_REDIS_ADDR"),
			DB:   redisDB,
		},

		RailsHost: os.Getenv("APP_RAILS_HOST"),

		RedisPubSubChannel: "broadcast",

		WsRedisSystemEmail: "System (redis)",
	}
}
