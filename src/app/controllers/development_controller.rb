# 開発者向けページ
class DevelopmentController < ApplicationController
  def index
  end

  # バックエンド動作確認
  def backend_test
    sample_service = SampleServices::SampleService.new
    sample_service.test_exec("backend_test")

    user = current_user

    p('user', user)
    p('user.to_json', user.to_json)
    p('user.as_json', user.as_json)
    p('user.as_json(include: :user_tweets)', user.as_json(include: :user_tweets))

    tweet = user.user_tweets.first

    if tweet
      p('tweet', tweet)
      p('tweet.to_json(include: :user)', tweet.to_json(include: :user))
      p('tweet.as_json(include: :user)', tweet.as_json(include: :user))
    end

    render :complate
  end

  # フロントエンド動作確認
  def frontend_test
    @name = "Test!!"
  end

  # WebScoketテスト
  def websocket_test
    system_service = WebsocketServices::SystemService.new

    system_service.send_from_system(
      ChannelServices::ChatChannelService.get_channel,
      { message: "Hello from Rails" }
    )

    render :complate
  end
end
