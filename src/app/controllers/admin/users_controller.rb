# ユーザー管理コントローラー
class Admin::UsersController < Admin::BaseController
  before_action :set_user, only: %i[ edit update destroy ]

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

    respond_to do |format|
      if @user.valid?
        # エラーがないとき
          
        @user.save

        format.html { redirect_to admin_user_path(@user), notice: "作成しました。" }
      else
        # エラーがあるとき
        
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # 更新処理
  def update
    @user.assign_attributes(user_params)

    respond_to do |format|
      if @user.valid?
        # エラーがないとき
          
        @user.save
        format.html { redirect_to admin_user_path(@user), notice: "更新しました。", status: :see_other }
      else
        # エラーがあるとき
        
        format.html { render :edit, status: :unprocessable_entity }
      end
    end
  end

  # 削除処理
  def destroy
    @user.discard

    respond_to do |format|
      format.html { redirect_to admin_users_path, notice: "削除しました。", status: :see_other }
    end
  end

  private
    # カレントデータの取得
    def set_user
      @user = User.find(params.expect(:id))
    end

    # 変更可能な項目だけを絞り込む
    def user_params
      params.expect(user: [ :email, :password, :password_confirmation ])
    end
end
