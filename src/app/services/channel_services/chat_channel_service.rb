class ChannelServices::ChatChannelService
  def self.get_channel(room = nil)
    'chat:' + room.to_s
  end
end
