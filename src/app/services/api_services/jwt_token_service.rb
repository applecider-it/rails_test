# APIのJWTトークン管理クラス
class ApiServices::JwtTokenService
  # JWTトークンをパース
  def parce_jwt(request)
    header = request.headers['Authorization']
    token = header.split(' ').last if header

    begin
      decoded = JWT.decode(token, ENV['APP_JWT_SECRET'], true, { algorithm: 'HS256' })
      return {
        user_id: decoded[0]['user_id'],
      }
    rescue JWT::DecodeError
      return nil
    end
  end
end
