# Websocketのシステム関連の管理クラス
class WebsocketServices::SystemService
  # ブロードキャスト用のRedisのpublishチャンネル
  # private constant
  REDIS_PUBLISH_CHANNEL_BROADCAST = 'broadcast'.freeze

  # Redis Pub/Subに送信
  def send_to_redis(channel, data)
    redis = DataServices::RedisService.get_redis

    data = {
      channel: channel,
      json: data.to_json
    }

    redis.publish(REDIS_PUBLISH_CHANNEL_BROADCAST, data.to_json)
  end

  private_constant :REDIS_PUBLISH_CHANNEL_BROADCAST
end
