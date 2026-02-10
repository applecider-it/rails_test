# チャットのRoom管理
class ChatServices::RoomService
  # Room情報取得
  def get_room_info(room)
    rooms = [
      'default',
      'room1',
      'room2',
      'room3',
    ]
    room = 'default' unless rooms.include?(room)

    {
      room: room,
      rooms: rooms,
    }
  end
end
