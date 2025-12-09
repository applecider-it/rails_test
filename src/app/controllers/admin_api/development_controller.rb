class AdminApi::DevelopmentController < ApplicationController
  before_action :authenticate_admin_user!

  # 動作確認用API
  def api_test
    render json: {
      message: "hello",
      current_admin_user: current_admin_user,
    }
  end
end
