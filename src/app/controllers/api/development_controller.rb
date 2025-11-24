# 開発者向けページ
class Api::DevelopmentController < Api::ApplicationController
  # CSRF チェックを無効化
  #skip_before_action :verify_authenticity_token, only: [:go_api_test]

  # GOからのレスポンステスト
  def go_api_test
    jwt_token_service = ApiServices::JwtTokenService.new

    token = jwt_token_service.get_jwt(request)
    ret = jwt_token_service.parse_jwt(token)

    p("parse result", ret)

    if ret
      p('valid token')
      user_id = ret[:user_id]
      user = User.find(user_id)
      p("user", user)

      p("params[:title]", params[:title])
      p("params[:sender_message]", params[:sender_message])

      render json: { status: 'OK' }
      return
    else
      p('invalid token')
      render json: { status: 'NG', error: 'Unauthorized' }, status: :unauthorized
      return
    end
  end
end
