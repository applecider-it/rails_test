# Websocketのシステム関連の管理クラス
class WebsocketServices::SystemService
  # Redis Pub/Subに送信
  def send_to_redis(channel, data)
    redis = DataServices::RedisService.get_redis

    data = {
      channel: channel,
      json: data.to_json
    }

    redis.publish(Rails.configuration.x.ws_redis_publish_channel, data.to_json)
  end
end
