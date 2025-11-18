class UserTweet < ApplicationRecord
  belongs_to :user

  validates :content, presence: true

  scope :search_by_keyword, ->(keyword) {
    return all if keyword.blank?
    where("content LIKE ?", "%#{sanitize_sql_like(keyword)}%")
  }
end
