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
    ActionCable.server.broadcast(
      "chat_channel",
      {
        message: params[:message],
        user_id: current_user.id,
        email: current_user.email,
      }
    )
    render json: { status: 'OK' }
  end
end
