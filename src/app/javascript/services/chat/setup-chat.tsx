/**
 * チャット画面のセットアップ
 */

import { createRoot } from 'react-dom/client';

import ChatClient from './ChatClient';
import ChatArea from './react/ChatArea';

const el = document.getElementById('chat-root');

if (el) {
  const all = JSON.parse(el.dataset.all!);

  console.log(all);

  const chatClient = new ChatClient(all.host, all.token, all.room);

  const root = createRoot(el);
  root.render(<ChatArea chatClient={chatClient} />);
}
