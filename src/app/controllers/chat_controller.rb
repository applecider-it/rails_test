class ChatController < ApplicationController
  before_action :authenticate_user!

  # チャット画面
  def index
    room_service = ChatServices::RoomService.new

    room = params[:room]

    ret = room_service.get_room_info(room)
    
    @rooms = ret[:rooms]
    @room = ret[:room]

    @token = current_user.jwt_token(ChannelServices::ChatChannelService.get_channel(@room))
  end

  # ActionCableによる送信
  def store_ac
    actioncable_service = ChatServices::ActioncableService.new

    actioncable_service.broadcast(params[:room], params[:message], current_user)

    render json: { status: 'OK' }
  end

  # Redisによる送信
  def store_redis
    redis_service = ChatServices::RedisService.new

    room = params[:room]
    message = params[:message]

    redis_service.broadcast(room, message)

    render json: { status: 'OK' }
  end
end
