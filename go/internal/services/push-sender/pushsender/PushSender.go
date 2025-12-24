package pushsender

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	webpush "github.com/SherClockHolmes/webpush-go"
	"github.com/go-redis/redis/v8"

	"myapp/internal/config"
	"myapp/internal/services/websocket-server/data"
)

// Push データの型定義
type PushData struct {
	Endpoint string `json:"endpoint"`
	P256dh   string `json:"p256dh"`
	Auth     string `json:"auth"`
	Title    string `json:"title"`
	Options  any    `json:"options"`
}

// プッシュ通知送信管理クラス
type PushSender struct {
	Config *config.Config
	Redis  *redis.Client
}

// プッシュ通知送信管理クラスコンストラクタ
func NewPushSender(cfg *config.Config) *PushSender {
	return &PushSender{
		Config: cfg,
		Redis:  data.GetRedis(cfg),
	}
}

// プッシュ通知送信起動
func (ps *PushSender) ExecPushSender() error {
	return ps.pushAll()
}

// Redisにあるデータをすべて送信
func (ps *PushSender) pushAll() error {
	ctx := context.Background()

	redisKey := ps.Config.Push.RedisKey

	for {
		item, err := ps.Redis.LPop(ctx, redisKey).Result()
		if err == redis.Nil {
			// キューが空 → 完了
			log.Println("Queue empty.")
			return nil
		}
		if err != nil {
			return err
		}

		if err := ps.pushOne(item); err != nil {
			log.Println("Push failed:", err)
		}
	}
}

// Redisにあるデータを１つ送信
func (ps *PushSender) pushOne(item string) error {
	var data PushData

	// JSON parse
	if err := json.Unmarshal([]byte(item), &data); err != nil {
		return fmt.Errorf("invalid JSON: %w", err)
	}

	// WebPush payload
	payload, err := json.Marshal(map[string]any{
		"title":   data.Title,
		"options": data.Options,
	})
	if err != nil {
		return err
	}

	sub := &webpush.Subscription{
		Endpoint: data.Endpoint,
		Keys: webpush.Keys{
			P256dh: data.P256dh,
			Auth:   data.Auth,
		},
	}

	mailto := "mailto:" + ps.Config.Push.Mailto
	publicKey := ps.Config.Push.PublicKey
	privateKey := ps.Config.Push.PrivateKey

	// WebPush request
	resp, err := webpush.SendNotification(
		payload,
		sub,
		&webpush.Options{
			Subscriber:      mailto,
			VAPIDPublicKey:  publicKey,
			VAPIDPrivateKey: privateKey,
			TTL:             60,
		},
	)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	log.Println("Sent:", data.Endpoint)
	return nil
}
