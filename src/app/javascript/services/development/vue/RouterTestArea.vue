<template>
  <div class="mt-5 py-6 border-gray-500 border-2 p-5 space-y-3">
    <div class="text-lg">router動作確認</div>

    <div>タグからの値: {{ name }}</div>

    <div>
      <Page1 />
    </div>
  </div>
</template>

<script setup lang="ts">
import Page1 from './router-test-area-vue/Page1.vue';

interface Props {
  name: string;
}

const props = defineProps<Props>();
</script>
