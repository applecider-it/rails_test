ActiveAdmin.register User do

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at
  #
  # or
  #
  # permit_params do
  #   permitted = [:email, :encrypted_password, :reset_password_token, :reset_password_sent_at, :remember_created_at]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end

  permit_params :email, :password, :password_confirmation

  # 削除ボタン除外
  actions :all, except: [:destroy]

  # 論理削除ボタン
  action_item :discard, only: :show, if: -> { !resource.discarded? } do
    link_to "論理削除", discard_admin_user_path(resource),
      method: :put,
      data: { confirm: "本当に論理削除しますか？" }
  end

  # 復元ボタン
  action_item :restore, only: :show, if: -> { resource.discarded? } do
    link_to "復元", undiscard_admin_user_path(resource),
      method: :put,
      data: { confirm: "復元しますか？" }
  end

  index do
    selectable_column
    id_column
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    column "状態" do |user|
      user.discarded? ? "削除済み" : "有効"
    end
    actions
  end

  # 絞り込みタブ
  scope :all, default: true
  scope :kept
  scope :discarded

  # 検索フィルター
  filter :email
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs do
      f.input :email
      f.input :password, hint: "空欄のままにすると変更されません"
      f.input :password_confirmation
    end
    f.actions
  end

  # 詳細画面
  show do
    attributes_table do
      row :id
      row :email
      row :created_at
      row :updated_at
      row :discarded_at
    end

    # ユーザーのツイート一覧
    panel "ツイート一覧" do
      paginated_collection(user.user_tweets.page(params[:tweets_page]).per(5),
          param_name: 'tweets_page',
          download_links: false) do
        table_for collection do
          column :id
          column :content
          column :created_at
          column :discarded_at
        end
      end
    end
    
    # 管理者コメントブロック
    active_admin_comments
  end

  # 論理削除
  member_action :discard, method: :put do
    ActiveRecord::Base.transaction do
      resource.discard
    end
    redirect_back fallback_location: admin_users_path, notice: "論理削除しました"
  end

  # 復元
  member_action :undiscard, method: :put do
    resource.undiscard
    redirect_back fallback_location: admin_users_path, notice: "復元しました"
  end  
end
