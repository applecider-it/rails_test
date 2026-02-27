import Pusher from 'pusher-js';

// Pusher(soketi) 接続
export const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
  wsHost: import.meta.env.VITE_PUSHER_HOST,
  wsPort: import.meta.env.VITE_PUSHER_PORT,
  forceTLS: false,
  disableStats: true,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER, // ← ★必須（Pusher互換だから、実際には使われない）
});
