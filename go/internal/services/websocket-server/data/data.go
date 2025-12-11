package data

import (
	"os"
	"strconv"

	"github.com/go-redis/redis/v8"
)

// Redisクライアントを返す
func GetRedis() *redis.Client {
	Addr := os.Getenv("APP_REDIS_ADDR")
	DB, _ := strconv.Atoi(os.Getenv("APP_REDIS_DB"))

	rdb := redis.NewClient(&redis.Options{
		Addr: Addr,
		DB:   DB,
	})

	return rdb
}
