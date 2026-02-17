# 管理画面ユーザー登録関連管理クラス
class AdminServices::UserServices::RegistrationService
  # 更新処理を上書き
  # 
  # パスワードがなくても更新できるようしている
  def update_params(params)
    if params[:password].blank? && params[:password_confirmation].blank?
      # パスワードが完全に空の時

      # 更新対象からパスワード関連を除外して、パスワードのバリデーションが動かないようにしている
      params.delete(:password)
      params.delete(:password_confirmation)
    end
  end
end
