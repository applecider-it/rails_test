class ChatChannel < ApplicationCable::Channel
  def subscribed
    channel_id = "chat_channel.#{params[:room]}"
    p('subscribed channel_id', channel_id)
    p('subscribed current_user', current_user)

    @meta = {
      channel_id: channel_id,
      current_user_id: current_user.id,
    }

    p('subscribed @meta', @meta)

    stream_from channel_id
  end

  def unsubscribed
    p('unsubscribed current_user', current_user)
    p('unsubscribed @meta', @meta)
    # Any cleanup needed when channel is unsubscribed
  end
end
