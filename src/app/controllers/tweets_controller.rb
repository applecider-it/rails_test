# ツイート管理コントローラー
# 
# ドキュメント
# /documents/features/tweet.md
class TweetsController < ApplicationController
  before_action :authenticate_user!

  # 一覧画面
  def index
    list_service = TweetServices::ListService.new
    page = params[:page]
    @keyword = params[:keyword]
    @tweets = list_service.get_list page, @keyword
  end

  # 新規作成画面
  def new
    @tweet = UserTweet.new
  end

  # 新規作成処理
  def create
    websocket_service = TweetServices::WebsocketService.new

    commit = params[:commit]
    confirm = params[:confirm]

    @tweet = UserTweet.new(tweet_params)
    @tweet.user = current_user

    respond_to do |format|
      if @tweet.valid?
        # エラーがないとき

        if commit
          # 確定ボタンの時
          
          @tweet.save

          websocket_service.broadcast(@tweet)

          format.html { redirect_to tweets_path, notice: "作成しました。" }
          format.json { render json: {status: true} }
        else
          if confirm
            # 確認ボタンの時
            # 確認画面に遷移
            
            format.html { render :new_confirm }
          else
            # 戻るボタンの時
            
            format.html { render :new }
          end
        end
      else
        # エラーがあるとき
        # 全てのボタンで共通
        
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: {errors: @tweet.errors}, status: :unprocessable_entity }
      end
    end
  end

  # 変更可能な項目だけを絞り込む
  private def tweet_params
    params.expect(tweet: [ :content ])
  end
end
