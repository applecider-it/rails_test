# 開発者向けページ
class Api::DevelopmentController < Api::ApplicationController
  # CSRF チェックを無効化
  #skip_before_action :verify_authenticity_token, only: [:go_api_test]

  # GOからのレスポンステスト
  def go_api_test
    header = request.headers['Authorization']
    token = header.split(' ').last if header

    p("token", token)

    begin
      decoded = JWT.decode(token, ENV['APP_JWT_SECRET'], true, { algorithm: 'HS256' })
      user = User.find(decoded[0]['user_id'])
      p("user", user)
    rescue JWT::DecodeError
      render json: { status: 'NG', error: 'Unauthorized' }, status: :unauthorized
      return
    end

    p("params[:message]", params[:message])

    render json: { status: 'OK' }
  end
end
