namespace :app do
  desc "WebSocketの動作確認"
  task :websocket_test, [:type] => :environment do |_t, args|
    obj = CommandServices::WebsocketTestCommandService.new
    obj.exec(args[:type]);
  end
end
