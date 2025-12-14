class ChatChannel < ApplicationCable::Channel
  def subscribed
    channel_id = "chat_channel.#{params[:room]}"
    p('subscribed channel_id', channel_id)
    stream_from channel_id
  end

  def unsubscribed
    p('unsubscribed')
    # Any cleanup needed when channel is unsubscribed
  end
end
