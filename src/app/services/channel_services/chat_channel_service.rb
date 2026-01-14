class ChannelServices::ChatChannelService
  def self.get_channel(room)
    'chat:' + room.to_s
  end
end
