# 開発者向けページ
class DevelopmentController < ApplicationController
  def index
  end

  # Ruby動作確認
  def ruby_test
    sample_service = SampleServices::SampleService.new
    sample_service.test_exec("ruby_test")

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

    memory_mb = `ps -o rss= -p #{Process.pid}`.to_i / 1024.0
    Rails.logger.info "使用メモリ: #{memory_mb.round(2)} MB"

    render :complate
  end

  # View動作確認
  def view_test
    setup_form_data
  end

  # View動作確認（post処理）
  def view_test_post
    setup_form_data
    @form = ViewTestForm.new

    @form.assign_attributes(view_test_params)

    render :view_test
  end

  # テスト用フォームデータのセットアップ
  private def setup_form_data
    form_service = DevelopmentServices::FormService.new
    ret = form_service.form_data

    @form = ret[:form]
    @list_vals = ret[:list_vals]
    @radio_vals = ret[:radio_vals]
  end

  # Javascript動作確認
  def javascript_test
    setup_form_data
    @name = "Test!!"
  end

  private def view_test_params
    params.expect(view_test_form: [ :list_val, :radio_val, :datetime_val ])
  end
end
