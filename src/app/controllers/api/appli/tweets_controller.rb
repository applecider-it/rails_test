# アプリ用ツイート管理コントローラー
class Api::Appli::TweetsController < ApplicationController
  # 一覧画面
  def index
    list_service = TweetServices::ListService.new
    page = params[:page]
    keyword = params[:keyword]
    tweets = list_service.get_list page, keyword

    render json: { status: 'OK', tweets: tweets.as_json(include: :user) }
  end
end
