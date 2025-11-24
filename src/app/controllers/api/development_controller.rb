# 開発者向けページ
class Api::DevelopmentController < Api::ApplicationController
  # CSRF チェックを無効化
  #skip_before_action :verify_authenticity_token, only: [:go_api_test]

  # GOからのレスポンステスト
  def go_api_test
    jwt_token_service = ApiServices::JwtTokenService.new
    ret = jwt_token_service.parce_jwt(request)

    p("parce result", ret)

    if ret
      user_id = ret[:user_id]
      user = User.find(user_id)
      p("user", user)

      p("params[:title]", params[:title])
      p("params[:sender_message]", params[:sender_message])

      render json: { status: 'OK' }
      return
    else
      render json: { status: 'NG', error: 'Unauthorized' }, status: :unauthorized
      return
    end
  end
end
