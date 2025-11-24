/**
 * チャート画面のセットアップ
 */

import { createRoot } from 'react-dom/client';

import ChatArea from './react/ChatArea';

const el = document.getElementById('chat-root')!;

if (el) {
  const all = JSON.parse(el.dataset.all!);

  console.log(all);

  createRoot(el).render(<ChatArea token={all.token} host={all.host} />);
}
