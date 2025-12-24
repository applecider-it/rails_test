package main

import (
	"fmt"
	"log"

	"myapp/internal/config"
	"myapp/internal/services/push-sender/pushsender"
	"myapp/internal/services/system"
)

func main() {
	fmt.Println("begin main")

	system.SetupApp()

	cfg := config.Load()

	sender := pushsender.NewPushSender(cfg)

	if err := sender.ExecPushSender(); err != nil {
		log.Fatal(err)
	}
}
