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

  # システムからの送信
  def send_from_system(channel, data)
    jwt_token_service = WebsocketServices::JwtTokenService.new
    token = jwt_token_service.create_system_jwt_token

    host = Rails.configuration.x.ws_server_host

    ws = WebSocket::Client::Simple.connect("ws://#{host}/ws?token=#{token}&channel=#{channel}")

    ws.on :open do
      ws.send({ json: data.to_json }.to_json)

      # 待ってからクローズ
      Thread.new do
        sleep 2
        ws.close
      end
    end
  end
end
