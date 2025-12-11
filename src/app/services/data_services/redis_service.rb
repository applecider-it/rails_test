require 'redis'

# Redis管理
class DataServices::RedisService
  # Redisインスタンスを返す
  def self.get_redis
    Redis.new(url: Rails.configuration.x.redis_url)
  end
end
