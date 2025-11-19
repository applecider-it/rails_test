class AddDiscardedAtToUserTweets < ActiveRecord::Migration[8.0]
  def change
    add_column :user_tweets, :discarded_at, :datetime
    add_index :user_tweets, :discarded_at
  end
end
