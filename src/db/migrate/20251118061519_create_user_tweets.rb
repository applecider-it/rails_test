class CreateUserTweets < ActiveRecord::Migration[8.0]
  def change
    create_table :user_tweets do |t|
      t.references :user, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
