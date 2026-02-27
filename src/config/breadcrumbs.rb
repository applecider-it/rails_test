# 管理画面ホーム
crumb :admin do
  link "ダッシュボード", admin_path
end

# ユーザー一覧
crumb :admin_users do
  link "ユーザー", admin_users_path
  parent :admin
end

# ユーザー新規作成
crumb :new_admin_user do
  link "新規作成", new_admin_user_path
  parent :admin_users
end

# ユーザー編集
crumb :edit_admin_user do |user|
  link user.email, edit_admin_user_path(user)
  parent :admin_users
end