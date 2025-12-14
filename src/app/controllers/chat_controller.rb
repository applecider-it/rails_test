class ChatController < ApplicationController
  before_action :authenticate_user!
  before_action :setup_service_class

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
    @actioncable_service.broadcast(params[:room], params[:message], current_user)
    render json: { status: 'OK' }
  end

  # サービスクラスのセットアップ
  private def setup_service_class
    @actioncable_service = ChatServices::ActioncableService.new
  end
end
