# チャットのRoom管理
class ChatServices::RoomService
  # Room情報取得
  def get_room_info(room)
    rooms = {
      default: 'デフォルト',
      room1: 'ルーム１',
      room2: 'ルーム２',
      room3: 'ルーム３',
    }

    room = 'default' unless rooms.key?(room&.to_sym)

    {
      room: room,
      rooms: rooms,
    }
  end
end
