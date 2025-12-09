<template>
  <div style="border: 1px solid #aaa; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
    <h3>Vue動作確認</h3>
    <div>タグからの値: {{ name }}</div>
    <div>
      <button @click="cnt++">Add</button>
    </div>
    <div>
      <span>cnt: {{ cnt }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  name: string;
}

const props = defineProps<Props>();

const name = ref(props.name ?? '');

const cnt = ref<number>(0);
</script>
