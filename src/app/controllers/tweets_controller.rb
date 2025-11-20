# ツイート管理コントローラー
# 
# ドキュメント
# /documents/features/tweet.md
class TweetsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tweet, only: %i[ show edit update destroy ]
  before_action :setup_service_class
  before_action :check_owner, only: %i[ edit update destroy ]

  # GET /tweets or /tweets.json
  def index
    page = params[:page]
    @keyword = params[:keyword]
    @tweets = @list_service.get_list page, @keyword
  end

  # GET /tweets/1 or /tweets/1.json
  def show
  end

  # GET /tweets/new
  def new
    @tweet = UserTweet.new
  end

  # GET /tweets/1/edit
  def edit
  end

  # POST /tweets or /tweets.json
  def create
    commit = params[:commit]
    confirm = params[:confirm]

    @tweet = UserTweet.new(tweet_params)
    @tweet.user = current_user

    respond_to do |format|
      if @tweet.valid?
        if commit
          @tweet.save
          format.html { redirect_to tweet_path(@tweet), notice: "作成しました。" }
          format.json { render :show, status: :created, location: tweet_path(@tweet) }
        else
          if confirm
            format.html { render :new_confirm }
          else
            format.html { render :new }
          end
        end
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @tweet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tweets/1 or /tweets/1.json
  def update
    commit = params[:commit]
    confirm = params[:confirm]

    @tweet.assign_attributes(tweet_params)

    respond_to do |format|
      if @tweet.valid?
        if commit
          @tweet.save
          format.html { redirect_to tweet_path(@tweet), notice: "更新しました。", status: :see_other }
          format.json { render :show, status: :ok, location: tweet_path(@tweet) }
        else
          if confirm
            format.html { render :edit_confirm }
          else
            format.html { render :edit }
          end
        end
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @tweet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tweets/1 or /tweets/1.json
  def destroy
    @tweet.discard

    respond_to do |format|
      format.html { redirect_to tweets_path, notice: "削除しました。", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tweet
      @tweet = UserTweet.kept.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def tweet_params
      params.expect(tweet: [ :content ])
    end

    # サービスクラスのセットアップ
    def setup_service_class
      @list_service = TweetServices::ListService.new
    end

    # オーナーチェック用メソッド
    def check_owner
      return if @tweet.user == current_user

      redirect_to tweets_path, alert: "権限がありません"
    end
end
