require 'redis'

# Websocketのシステム関連の管理クラス
class WebsocketServices::SystemService
  # Redis Pub/Subに送信
  def send_to_redis(channel, data)
    redis = Redis.new(host: '127.0.0.1', port: 6379, db: 0)

    data = {
      channel: channel,
      json: data.to_json
    }

    redis.publish("broadcast", data.to_json)
  end
end
