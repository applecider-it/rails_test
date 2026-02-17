# 管理画面　ユーザー一覧関連管理
class AdminServices::UserServices::ListService
  # 一覧取得
  def get_list(page, keyword)
    User
      .order(id: :desc)
      .search_by_keyword(keyword)
      .page(page)
      .per(10)
  end

  # ユーザーのツイート一覧取得
  def get_tweets(user, tweets_page)
    user.user_tweets
      .order(id: :desc)
      .page(tweets_page)
      .per(5)
  end
end
