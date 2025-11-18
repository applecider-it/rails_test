# 開発者向けページ
class DevelopmentController < ApplicationController
  def index
  end

  # バックエンド動作確認
  def backend_test
    sample_service = SampleServices::SampleService.new
    sample_service.test_exec("backend_test")

    render :complate
  end

  # React動作確認
  def react_test
    @name = "Test!!"
  end
end
