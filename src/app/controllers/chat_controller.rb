class ChatController < ApplicationController
  before_action :authenticate_user!
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
end
