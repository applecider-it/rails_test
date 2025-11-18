class UserTweetsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user_tweet, only: %i[ show edit update destroy ]

  # GET /user_tweets or /user_tweets.json
  def index
    @user_tweets = UserTweet.all
  end

  # GET /user_tweets/1 or /user_tweets/1.json
  def show
  end

  # GET /user_tweets/new
  def new
    @user_tweet = UserTweet.new
  end

  # GET /user_tweets/1/edit
  def edit
  end

  # POST /user_tweets or /user_tweets.json
  def create
    @user_tweet = UserTweet.new(user_tweet_params)
    @user_tweet.user = current_user

    respond_to do |format|
      if @user_tweet.save
        format.html { redirect_to @user_tweet, notice: "User tweet was successfully created." }
        format.json { render :show, status: :created, location: @user_tweet }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @user_tweet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /user_tweets/1 or /user_tweets/1.json
  def update
    respond_to do |format|
      if @user_tweet.update(user_tweet_params)
        format.html { redirect_to @user_tweet, notice: "User tweet was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @user_tweet }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user_tweet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_tweets/1 or /user_tweets/1.json
  def destroy
    @user_tweet.destroy!

    respond_to do |format|
      format.html { redirect_to user_tweets_path, notice: "User tweet was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_tweet
      @user_tweet = UserTweet.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def user_tweet_params
      params.expect(user_tweet: [ :content ])
    end
end
