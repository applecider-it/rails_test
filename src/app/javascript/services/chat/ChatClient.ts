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
        received: (data) => this.onMessageAC(data),
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
  onMessageAC(data) {
    console.log('受信:', data);
    this.addMessage({
      message: data.message,
      userId: data.user_id,
      email: data.email,
    } as ChatMessage);
  }

  /** メッセージ送信 */
  sendMessage(message: string, type: string) {
    console.log('sendMessage', message, type);
    if (!message) return;

    if (type === 'websocket') {
      this.send(message);
    } else {
      this.sendApi(message, type);
    }
  }

  /** WebSocketメッセージ送信 */
  private async send(message: string) {
    const json = JSON.stringify({ message });
    this.ws.send(JSON.stringify({ json }));
    this.setMessage('');
  }

  /** APIでメッセージ送信 */
  private async sendApi(message: string, type: string) {
    const headers = jsonRequestHeaders();

    const data: any = { message, room: this.room };
    console.log(data);

    const url = {
      'actioncable': '/chat/store_ac',
      'redis': '/chat/store_redis',
    }[type];

    const response = await axios.post(url, data, {
      headers: headers,
    });
    console.log('response.data', response.data);
    this.setMessage('');
  }
}
