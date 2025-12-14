require 'redis'

# チャットのActionCable管理
class ChatServices::ActioncableService
  # ブロードキャスト
  def broadcast(room, message, user)
    channel_id = "chat_channel.#{room}"
    p("store_ac channel_id", channel_id)
    ActionCable.server.broadcast(
      channel_id,
      {
        message: message,
        user_id: user.id,
        email: user.email,
      }
    )
  end
end
