class ChatController < ApplicationController
  before_action :authenticate_user!
  def index
    @token = current_user.jwt_token(ChannelServices::ChatChannelService.get_channel(params[:room]))
  end
end
