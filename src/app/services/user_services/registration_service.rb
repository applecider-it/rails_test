# ユーザー登録関連管理クラス
class UserServices::RegistrationService
  # 更新処理を上書き
  # 
  # パスワードがなくても更新できるようしている
  def update_resource(resource, params)
    if params[:password].blank? && params[:password_confirmation].blank?
      # パスワードが完全に空の時

      # 更新対象からパスワード関連を除外して、パスワードのバリデーションが動かないようにしている
      params.delete(:current_password)
      params.delete(:password)
      params.delete(:password_confirmation)

      resource.update_without_password(params)
    else
      # パスワードが少しでも入力があるとき
      
      resource.update_with_password(params)
    end
  end
end
