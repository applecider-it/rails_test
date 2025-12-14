class ChatController < ApplicationController
  before_action :authenticate_user!

  # チャット画面
  def index
    @room = params[:room]
    @rooms = [
      nil,
      'room1',
      'room2',
      'room3',
    ]
    @token = current_user.jwt_token(ChannelServices::ChatChannelService.get_channel(@room))
  end

  # ActionCableによる送信
  def store_ac
    channel_id = "chat_channel.#{params[:room]}"
    p("store_ac channel_id", channel_id)
    ActionCable.server.broadcast(
      channel_id,
      {
        message: params[:message],
        user_id: current_user.id,
        email: current_user.email,
      }
    )
    render json: { status: 'OK' }
  end
end
