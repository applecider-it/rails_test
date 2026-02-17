# ユーザー管理コントローラー
class Admin::UsersController < Admin::BaseController
  before_action :set_user, only: %i[ edit update destroy ]
  before_action :edit_common, only: %i[ edit update ]

  # 一覧画面
  def index
    page = params[:page]
    @keyword = params[:keyword]

    @users = User
      .order(id: :desc)
      .search_by_keyword(@keyword)
      .page(page)
      .per(20)
  end

  # 新規作成画面
  def new
    @user = User.new
  end

  # 更新画面
  def edit
  end

  # 新規作成処理
  def create
    @user = User.new(user_params)

    if @user.valid?
      # エラーがないとき

      @user.save

      redirect_to edit_admin_user_path(@user), notice: "作成しました。"
    else
      # エラーがあるとき
      
      render :new, status: :unprocessable_entity
    end
  end

  # 更新処理
  def update
    params = user_params

    if params[:password].blank? && params[:password_confirmation].blank?
      # パスワードが完全に空の時

      # 更新対象からパスワード関連を除外して、パスワードのバリデーションが動かないようにしている
      params.delete(:password)
      params.delete(:password_confirmation)
    end

    @user.assign_attributes(params)

    if @user.valid?
      # エラーがないとき

      @user.save

      redirect_to edit_admin_user_path(@user), notice: "更新しました。", status: :see_other
    else
      # エラーがあるとき
      
      render :edit, status: :unprocessable_entity
    end
  end

  # 削除処理
  def destroy
    @user.discard

    redirect_to admin_users_path, notice: "削除しました。", status: :see_other
  end

  # カレントデータの取得
  private def set_user
    @user = User.find(params.expect(:id))
  end

  # 変更可能な項目だけを絞り込む
  private def user_params
    params.expect(user: [ :email, :password, :password_confirmation ])
  end

  # 更新画面の共通処理
  private def edit_common
    tweets_page = params[:tweets_page]
    @tweets = @user.user_tweets
      .order(id: :desc)
      .page(tweets_page)
      .per(5)
  end
end
