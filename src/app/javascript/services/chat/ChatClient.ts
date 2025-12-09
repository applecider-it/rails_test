/**
 * チャットクライアント
 */
export default class ChatClient{
  ws;
  setMessage;
  setMessages;

  constructor(host, token){
        // WebSocket 接続
    this.ws = new WebSocket(`ws://${host}/ws?token=${token}`);

    this.ws.onmessage = (event) => {
      // result = { data: { json }, sender: { user_id, email } }
      const result = JSON.parse(event.data);

      const data = JSON.parse(result.data.json);

      this.setMessages((prev) => [
        {
          message: data.message,
          userId: result.sender.user_id,
          email: result.sender.email,
        },
        ...prev, // 先頭に追加 → 最新メッセージが上
      ]);
    };
  }
  
  /** メッセージ送信 */
  sendMessage(message: string) {
    if (!message) return;

    const json = JSON.stringify({ message });
    this.ws.send(JSON.stringify({ json }));
    this.setMessage('');
  };
}