# 管理者モデル
# 
# ドキュメント
# /documents/models/admin_user.md
class AdminUser < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :validatable

  # メーラーを設定
  # 
  # Devise が内部で使ってるメソッド
  def devise_mailer
    AdminUserDeviseMailer
  end
end
