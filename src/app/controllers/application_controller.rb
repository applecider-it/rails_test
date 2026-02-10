class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # deviseのログイン後のパスを変更
  def after_sign_in_path_for(resource)
    case resource
    when AdminUser
      admin_path
    else
      root_path
    end
  end

  # deviseのログアウト後のパスを変更
  def after_sign_out_path_for(resource_or_scope)
    case resource_or_scope
    when :admin_user
      new_admin_user_session_path
    else
      new_user_session_path
    end
  end
end
