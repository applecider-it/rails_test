import { showToast } from '@/services/ui/message';

/**
 * WebSocket管理
 *
 * JWT認証付き WebSocket
 */
export default class WebSocketCtrl {
  token;
  wsHost;
  user;
  ws;

  constructor(token, wsHost, user) {
    this.token = token;
    this.wsHost = wsHost;
    this.user = user;

    this.ws = null;

    this.initWebSocket();
  }

  /** WebSocket 接続初期化 */
  initWebSocket() {
    console.log(`[DEBUG] Connecting WebSocket with token: ${this.token}`);

    this.ws = new WebSocket(
      `ws://${this.wsHost}/ws?token=${this.token}`
    );

    this.ws.onopen = () => {
      console.log('[DEBUG] WebSocket connected');
    };

    this.ws.onmessage = (event) => this.handleMessage(event);

    this.ws.onclose = (event) => {
      console.log('[DEBUG] WebSocket closed', event);
    };

    this.ws.onerror = (err) => {
      console.error('[DEBUG] WebSocket error', err);
    };
  }

  /** メッセージ受信 */
  handleMessage(event) {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (err) {
      console.error('[DEBUG] Failed to parse message', event.data, err);
      return;
    }

    console.log('[DEBUG] Received message', data);

    const detail = JSON.parse(data.data.json);

    if (this.user.id === detail.user_id) {
      console.log('自分のツイート');
      return;
    }

    showToast(`新しいツイートがあります。${detail.content}`);
  }
}
