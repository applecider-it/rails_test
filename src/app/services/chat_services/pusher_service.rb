require 'redis'

# チャットのPusher管理
class ChatServices::PusherService
  # ブロードキャスト
  def broadcast(room, message, user)
    channel_id = "rails-chat-channel-#{room}"
    p("store_p channel_id", channel_id)
    
    Pusher.trigger(
      channel_id, 'new-message',
      {
        message: "#{message} (P)",
        user_id: user.id,
        email: user.email,
      }
    )
  end
end
