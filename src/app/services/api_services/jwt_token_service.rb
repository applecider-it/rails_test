# APIのJWTトークン管理クラス
class ApiServices::JwtTokenService
  # JWTトークンをパース
  def parce_jwt(request)
    token = get_jwt(request)

    begin
      decoded = JWT.decode(token, ENV['APP_JWT_SECRET'], true, { algorithm: 'HS256' })
      return {
        user_id: decoded[0]['user_id'],
      }
    rescue JWT::DecodeError
      return nil
    end
  end

  # リクエストオブジェクトからJWTトークンを取得
  private def get_jwt(request)
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    token
  end
end
