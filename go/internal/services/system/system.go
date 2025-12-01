package system

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// アプリケーションのセットアップ
func SetupApp() {
	// .env を読み込む
	if err := godotenv.Load(); err != nil {
		log.Println(".env file not found, using system environment variables")
	}

	var jwtSecret []byte = []byte(os.Getenv("APP_JWT_SECRET"))
	if len(jwtSecret) == 0 {
		log.Fatal("APP_JWT_SECRET is not set")
	}
}
