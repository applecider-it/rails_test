package pushsender

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	webpush "github.com/SherClockHolmes/webpush-go"
	"github.com/go-redis/redis/v8"

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
	Mailto     string
	PublicKey  string
	PrivateKey string
	RedisKey   string
	Redis      *redis.Client
}

// プッシュ通知送信管理クラスコンストラクタ
func NewPushSender(mailto string, publicKey string, privateKey string, redisKey string) *PushSender {
	return &PushSender{
		Mailto:     mailto,
		PublicKey:  publicKey,
		PrivateKey: privateKey,
		RedisKey:   redisKey,
		Redis:      data.GetRedis(),
	}
}

// プッシュ通知送信起動
func (ps *PushSender) ExecPushSender() error {
	return ps.pushAll()
}

// Redisにあるデータをすべて送信
func (ps *PushSender) pushAll() error {
	ctx := context.Background()

	for {
		item, err := ps.Redis.LPop(ctx, ps.RedisKey).Result()
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

	// WebPush request
	resp, err := webpush.SendNotification(
		payload,
		sub,
		&webpush.Options{
			Subscriber:      ps.Mailto,
			VAPIDPublicKey:  ps.PublicKey,
			VAPIDPrivateKey: ps.PrivateKey,
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
