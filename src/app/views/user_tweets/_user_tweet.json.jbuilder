json.extract! user_tweet, :id, :user_id, :content, :created_at, :updated_at
json.url user_tweet_url(user_tweet, format: :json)
