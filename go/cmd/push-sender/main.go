/*
Push通知一括送信処理のエントリーポイント
*/

package main

import (
	"myapp/internal/services/push-sender/setup"
)

func main() {
	setup.SetupPushSender()
}
