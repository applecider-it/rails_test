require "test_helper"

class TweetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_tweet = user_tweets(:one)
  end

  test "should get index" do
    get user_tweets_url
    assert_response :success
  end

  test "should get new" do
    get new_user_tweet_url
    assert_response :success
  end

  test "should create user_tweet" do
    assert_difference("UserTweet.count") do
      post user_tweets_url, params: { user_tweet: { content: @user_tweet.content, user_id: @user_tweet.user_id } }
    end

    assert_redirected_to user_tweet_url(UserTweet.last)
  end

  test "should show user_tweet" do
    get user_tweet_url(@user_tweet)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_tweet_url(@user_tweet)
    assert_response :success
  end

  test "should update user_tweet" do
    patch user_tweet_url(@user_tweet), params: { user_tweet: { content: @user_tweet.content, user_id: @user_tweet.user_id } }
    assert_redirected_to user_tweet_url(@user_tweet)
  end

  test "should destroy user_tweet" do
    assert_difference("UserTweet.count", -1) do
      delete user_tweet_url(@user_tweet)
    end

    assert_redirected_to user_tweets_url
  end
end
