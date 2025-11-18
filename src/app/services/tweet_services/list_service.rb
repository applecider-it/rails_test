# ツイートの一覧関連管理
class TweetServices::ListService
  # 一覧用のオブジェクト
  def get_list(page)
    UserTweet
      .includes(:user)
      .order(id: :desc)
      .page(page)
      .per(2)
  end
end
