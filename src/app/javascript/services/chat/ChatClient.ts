import { ChatMessage } from './types';

import consumer from '@/channels/consumer';

import axios from 'axios';

import { jsonRequestHeaders } from '@/services/api/http';

/**
 * チャットクライアント
 */
export default class ChatClient {
  ws;
  setMessage;
  addMessage;
  room;

  constructor(host, token, room) {
    this.room = room;

    console.log('this.room', this.room);

    // WebSocket 接続
    this.ws = new WebSocket(`ws://${host}/ws?token=${token}`);
    this.ws.onmessage = (event) => this.onMessage(event);

    // ActionCable 接続
    consumer.subscriptions.create(
      { channel: 'ChatChannel', room: this.room },
      {
        received: (data) => this.onReceived(data),
      }
    );
  }

  /** WebSocketメッセージ受信 */
  onMessage(event) {
    // result = { data: { json }, sender: { user_id, email } }
    const result = JSON.parse(event.data);
    console.log('onmessage', result);

    const data = JSON.parse(result.data.json);

    this.addMessage({
      message: data.message,
      userId: result.sender.user_id,
      email: result.sender.email,
    } as ChatMessage);
  }

  /** ActionCableメッセージ受信 */
  onReceived(data) {
    console.log('受信:', data);
    this.addMessage({
      message: data.message,
      userId: data.user_id,
      email: data.email,
    } as ChatMessage);
  }

  /** WebSocketメッセージ送信 */
  sendMessage(message: string) {
    console.log(message);
    if (!message) return;

    const json = JSON.stringify({ message });
    this.ws.send(JSON.stringify({ json }));
    this.setMessage('');
  }

  /** ActionCableでメッセージ送信 */
  async sendMessageAC(message: string) {
    const headers = jsonRequestHeaders();

    const data: any = { message, room: this.room };
    console.log(data);

    const response = await axios.post('/chat/store_ac', data, {
      headers: headers,
    });
    console.log('response.data', response.data);
    this.setMessage('');
  }
}
