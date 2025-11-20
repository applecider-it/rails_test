# ユーザーモデル

論理削除前に、関連テーブルも論理削除している。

## DB

論理削除付き

| 項目名 | 内容 | 型 | 詳細 |
|--------|--------|--------|--------|
| email | メールアドレス | string | devise標準 |
| encrypted_password | パスワード | string | devise標準 |
| reset_password_token | パスワードリセットトークン | string | devise標準 |
| reset_password_sent_at | パスワードリセットトークン送信日時 | datetime | devise標準 |
| remember_created_at | リメンバー送信日時 | datetime | devise標準 |

