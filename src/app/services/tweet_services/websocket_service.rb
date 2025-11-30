# ツイートのWebSocket関連管理
class TweetServices::WebsocketService
  # ブロードキャスト
  def broadcast(tweet)
    system_service = WebsocketServices::SystemService.new

    system_service.send_from_system(
      "tweet",
      { content: tweet.content }
    )
  end
end
