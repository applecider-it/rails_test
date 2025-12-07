# ツイートのWebSocket関連管理
class TweetServices::WebsocketService
  # ブロードキャスト
  def broadcast(tweet)
    system_service = WebsocketServices::SystemService.new

    system_service.send_to_redis(
      ChannelServices::TweetChannelService.get_channel,
      { content: tweet.content, user_id: tweet.user_id }
    )
  end
end
