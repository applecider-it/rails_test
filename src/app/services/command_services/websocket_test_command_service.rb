class CommandServices::WebsocketTestCommandService
  def exec(type)
    puts "type: #{type}"

    case type
    when "redis"
      test_redis
    else
      puts "invalid type: #{type}"
    end
  end

  def test_redis
    system_service = WebsocketServices::SystemService.new

    system_service.send_to_redis(
      ChannelServices::ChatChannelService.get_channel,
      { message: "Hello from Rails Redis Pub/Sub" }
    )

    puts "test_redis sended"
  end
end
