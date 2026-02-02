require 'jwt'

# ユーザーモデル
# 
# ドキュメント
# /documents/models/user.md
class User < ApplicationRecord
  include Discard::Model

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :user_tweets

  before_discard :discard_all_relations

  # ActiveAdmin / Ransack 用に属性を許可
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "email", "id", "updated_at", "reset_password_token", "discard_status"]
  end

  # 有効なユーザーかの値を返すransack用属性
  # ActiveAdminで利用している
  ransacker :discard_status do |parent|
    Arel.sql <<~SQL
      CASE
        WHEN #{parent.table.name}.discarded_at IS NULL THEN 'kept'
        ELSE 'discarded'
      END
    SQL
  end

  # ActiveAdmin / Ransack 用に関連を許可
  def self.ransackable_associations(auth_object = nil)
    []
  end

  # ActiveAdminで空のパスワードは無視するためのメソッド
  def password_required?
    new_record? || password.present?
  end

  # ログイン可能かチェック
  def active_for_authentication?
    super && !discarded?
  end

  # 無効な理由（フラッシュ表示用）
  def inactive_message
    discarded? ? :deleted_account : super
  end

  # 関連テーブル全てを高速に論理削除
  private def discard_all_relations
    user_tweets.kept.update_all(discarded_at: Time.current)
  end

  # WebSocket用のjwtトークン
  def jwt_token(channel)
    jwt_token_service = WebsocketServices::JwtTokenService.new
    jwt_token_service.create_user_jwt_token(self, channel)
  end

  # シリアライズ対象から除外
  def self.hidden_attributes
    [:created_at, :updated_at, :discarded_at]
  end
end
