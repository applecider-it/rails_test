# WebsocketのJWTトークン管理クラス
class WebsocketServices::JwtTokenService
  # JWTトークンをパース
  def parse_jwt(token)
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
  def get_jwt(request)
    header = request.headers['Authorization']
    token = header.split(' ').last if header
    token
  end

  # userのjwtトークン
  def create_user_jwt_token(user, channel)
    payload = {
      user_id: user.id,
      email: user.email,
      channel: channel,
      exp: 24.hours.from_now.to_i,
      iat: Time.current.to_i
    }

    secret = ENV['APP_JWT_SECRET']  # .env の値を参照

    JWT.encode(payload, secret, 'HS256')
  end
end
