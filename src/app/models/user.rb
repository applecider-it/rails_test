class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # ActiveAdmin / Ransack 用に属性を許可
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "email", "id", "updated_at", "reset_password_token"]
  end

  # ActiveAdmin / Ransack 用に関連を許可
  def self.ransackable_associations(auth_object = nil)
    []
  end
end
