# JSツイート管理コントローラー
# 
# ドキュメント
# /documents/features/tweet.md
class TweetsJsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    @token = current_user.jwt_token(ChannelServices::TweetChannelService.get_channel)
  end
end
