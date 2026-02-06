# ツイート管理コントローラー
# 
# ドキュメント
# /documents/features/tweet.md
class TweetsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tweet, only: %i[ show edit update destroy ]
  before_action :setup_service_class
  before_action :check_owner, only: %i[ edit update destroy ]

  # 一覧画面
  def index
    page = params[:page]
    @keyword = params[:keyword]
    @tweets = @list_service.get_list page, @keyword
  end

  # 詳細画面
  def show
  end

  # 新規作成画面
  def new
    @tweet = UserTweet.new
  end

  # 更新画面
  def edit
  end

  # 新規作成処理
  def create
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

          @websocket_service.broadcast(@tweet)

          format.html { redirect_to tweet_path(@tweet), notice: "作成しました。" }
          format.json { render :show, status: :created, location: tweet_path(@tweet) }
        else
          if confirm
            # 確認ボタンの時
            # 確認画面に遷移
            # Jsonでは、statusだけ返す。
            
            format.html { render :new_confirm }
            format.json { render json: {status: true} }
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

  # 更新処理
  def update
    commit = params[:commit]
    confirm = params[:confirm]

    @tweet.assign_attributes(tweet_params)

    respond_to do |format|
      if @tweet.valid?
        # エラーがないとき

        if commit
          # 確定ボタンの時
          
          @tweet.save
          format.html { redirect_to tweet_path(@tweet), notice: "更新しました。", status: :see_other }
          format.json { render :show, status: :ok, location: tweet_path(@tweet) }
        else
          if confirm
            # 確認ボタンの時
            # 確認画面に遷移
            # Jsonでは、statusだけ返す。
            
            format.html { render :edit_confirm }
            format.json { render json: {status: true} }
          else
            # 戻るボタンの時
            
            format.html { render :edit }
          end
        end
      else
        # エラーがあるとき
        # 全てのボタンで共通
        
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: {errors: @tweet.errors}, status: :unprocessable_entity }
      end
    end
  end

  # 削除処理
  def destroy
    @tweet.discard

    respond_to do |format|
      format.html { redirect_to tweets_path, notice: "削除しました。", status: :see_other }
      format.json { head :no_content }
    end
  end

  # カレントデータの取得
  private def set_tweet
    @tweet = UserTweet.kept.find(params.expect(:id))
  end

  # 変更可能な項目だけを絞り込む
  private def tweet_params
    params.expect(tweet: [ :content ])
  end

  # サービスクラスのセットアップ
  private def setup_service_class
    @list_service = TweetServices::ListService.new
    @websocket_service = TweetServices::WebsocketService.new
  end

  # オーナーチェック用メソッド
  private def check_owner
    return if @tweet.user == current_user

    redirect_to tweets_path, alert: "権限がありません"
  end
end
