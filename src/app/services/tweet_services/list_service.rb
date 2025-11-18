# ツイートの一覧関連管理
class TweetServices::ListService
  # 一覧用のオブジェクト
  def get_list(page, keyword)
    UserTweet
      .includes(:user)
      .order(id: :desc)
      .search_by_keyword(keyword)
      .page(page)
      .per(5)
  end
end
