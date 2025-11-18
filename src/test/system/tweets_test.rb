require "application_system_test_case"

class TweetsTest < ApplicationSystemTestCase
  setup do
    @user_tweet = user_tweets(:one)
  end

  test "visiting the index" do
    visit user_tweets_url
    assert_selector "h1", text: "User tweets"
  end

  test "should create user tweet" do
    visit user_tweets_url
    click_on "New user tweet"

    fill_in "Content", with: @user_tweet.content
    fill_in "User", with: @user_tweet.user_id
    click_on "Create User tweet"

    assert_text "User tweet was successfully created"
    click_on "Back"
  end

  test "should update User tweet" do
    visit user_tweet_url(@user_tweet)
    click_on "Edit this user tweet", match: :first

    fill_in "Content", with: @user_tweet.content
    fill_in "User", with: @user_tweet.user_id
    click_on "Update User tweet"

    assert_text "User tweet was successfully updated"
    click_on "Back"
  end

  test "should destroy User tweet" do
    visit user_tweet_url(@user_tweet)
    click_on "Destroy this user tweet", match: :first

    assert_text "User tweet was successfully destroyed"
  end
end
