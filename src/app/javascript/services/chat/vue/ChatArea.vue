<template>
  <div>
    <div>
      <input
        type="text"
        class="app-form-input"
        style="max-width: 30rem"
        v-model="message"
        placeholder="Message"
        @keydown="onKeydown"
      />
      <button @click="() => sendMessage('websocket')" class="app-btn-primary w-auto ml-2 mt-2">
        Send
      </button>
      <button @click="() => sendMessage('redis')" class="app-btn-primary w-auto ml-2 mt-2">
        Send(R)
      </button>
      <button @click="() => sendMessage('actioncable')" class="app-btn-primary w-auto ml-2 mt-2">
        Send(AC)
      </button>
    </div>

    <div class="h-72 my-5 overflow-y-scroll border-2">
      <ul>
        <li v-for="(msg, index) in reversedMessages" :key="index" class="p-1">
          {{ msg.message }}
          <span class="ml-3 text-sm text-gray-500">
            by {{ msg.email }} ({{ msg.userId }})
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
/** チャットエリアコンポーネント */

import { ref, onMounted, computed } from 'vue';
import type ChatClient from '../ChatClient';
import { ChatMessage } from '../types';

const props = defineProps<{
  chatClient: ChatClient;
}>();

const message = ref<string>('');
const messages = ref<ChatMessage[]>([]);

/** 逆順のメッセージリスト */
const reversedMessages = computed(() => [...messages.value].reverse());

/** キーダウン時 */
const onKeydown = (e) => {
  if (e.key === 'Enter') sendMessage('websocket');
};

/** メッセージ送信 */
const sendMessage = (type: string) => {
  console.log(message.value);
  props.chatClient.sendMessage(message.value, type);
};

// 初期化時
onMounted(() => {
  props.chatClient.setMessage = (val: string) => {
    message.value = val;
  };

  props.chatClient.addMessage = (val: ChatMessage) => {
    messages.value.push(val);
  };
});
</script>
