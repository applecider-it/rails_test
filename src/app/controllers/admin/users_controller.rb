# ユーザー管理コントローラー
class Admin::UsersController < Admin::BaseController
  before_action :set_user, only: %i[ edit update destroy restore ]
  before_action :edit_common, only: %i[ edit update ]

  # 一覧画面
  def index
    list_service = AdminServices::UserServices::ListService.new

    page = params[:page]
    @keyword = params[:keyword]

    @users = list_service.get_list(page, @keyword)
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
    edit_service = AdminServices::UserServices::EditService.new

    work_params = user_params

    edit_service.update_params(work_params)

    @user.assign_attributes(work_params)

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

    redirect_to edit_admin_user_path(@user), notice: "削除しました。", status: :see_other
  end

  # 復元処理
  def restore
    @user.undiscard

    redirect_to edit_admin_user_path(@user), notice: "復元しました。", status: :see_other
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
    list_service = AdminServices::UserServices::ListService.new

    tweets_page = params[:tweets_page]
    
    @tweets = list_service.get_tweets(@user, tweets_page)
  end
end
