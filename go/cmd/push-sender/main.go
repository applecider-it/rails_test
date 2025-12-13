package main

import (
	"fmt"
	"log"
	"os"

	"myapp/internal/services/push-sender/pushsender"
	"myapp/internal/services/system"
)

func main() {
	fmt.Println("begin main")

	system.SetupApp()

	mailto := "mailto:you@example.com"
	publicKey := os.Getenv("APP_VAPID_PUBLIC_KEY")
	privateKey := os.Getenv("APP_VAPID_PRIVATE_KEY")
	redisKey := "laravel-test-database-push_queue"

	sender := pushsender.NewPushSender(mailto, publicKey, privateKey, redisKey)

	if err := sender.ExecPushSender(); err != nil {
		log.Fatal(err)
	}
}
