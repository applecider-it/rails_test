/**
 * チャート画面のセットアップ
 */

import { createApp } from 'vue';

import ChatClient from './ChatClient';
import ChatArea from './vue/ChatArea.vue';

const el = document.getElementById('chat-root')!;

if (el) {
  const all = JSON.parse(el.dataset.all!);

  console.log(all);

  const chatClient = new ChatClient(all.host, all.token);

  createApp(ChatArea, { chatClient }).mount(el);
}
