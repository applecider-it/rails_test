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

      <button
        @click="sendMessage('websocket')"
        class="app-btn-primary w-auto ml-2 mt-2"
      >
        Send
      </button>

      <button
        @click="sendMessage('redis')"
        class="app-btn-primary w-auto ml-2 mt-2"
      >
        Send(R)
      </button>

      <button
        @click="sendMessage('actioncable')"
        class="app-btn-primary w-auto ml-2 mt-2"
      >
        Send(AC)
      </button>

      <button
        @click="sendMessage('pusher')"
        class="app-btn-primary w-auto ml-2 mt-2"
      >
        Send(P)
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

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  chatClient: Object,
});

const message = ref('');
const messages = ref([]);

/** 逆順メッセージ */
const reversedMessages = computed(() => {
  return [...messages.value].reverse();
});

/** Enterキー */
const onKeydown = (e) => {
  if (e.key === 'Enter') sendMessage('websocket');
};

/** メッセージ送信 */
const sendMessage = (type) => {
  console.log(message.value);
  props.chatClient.sendMessage(message.value, type);
  message.value = '';
};

/** 初期化 */
onMounted(() => {
  props.chatClient.addMessage = (val) => {
    messages.value.push(val);
  };
});
</script>
