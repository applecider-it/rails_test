module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      p("request.cookie_jar", request.cookie_jar)
      p("cookies.to_hash", cookies.to_hash)
      p("HTTP_COOKIE", env["HTTP_COOKIE"])
      p("warden", env["warden"])
      p("env[warden].user", env["warden"].user)
      p("env[warden].user(:user)", env["warden"]&.user(:user))
      p("env[warden].user(:admin_user)", env["warden"]&.user(:admin_user))
      env["warden"]&.user(:user) || reject_unauthorized_connection
    end
  end
end
