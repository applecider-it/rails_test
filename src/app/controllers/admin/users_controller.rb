# ユーザー管理コントローラー
class Admin::UsersController < Admin::BaseController
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /users or /users.json
  def index
    page = params[:page]
    @keyword = params[:keyword]
    @users = User
      .order(id: :desc)
      .search_by_keyword(@keyword)
      .page(page)
      .per(20)
  end

  # GET /users/1 or /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # 新規作成処理
  # POST /users or /users.json
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
  # PATCH/PUT /users/1 or /users/1.json
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

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.discard

    respond_to do |format|
      format.html { redirect_to admin_users_path, notice: "削除しました。", status: :see_other }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.expect(user: [ :email, :password, :password_confirmation ])
    end
end
