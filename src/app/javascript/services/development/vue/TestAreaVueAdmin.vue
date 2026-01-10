<template>
  <div
    style="
      border: 1px solid #aaa;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    "
  >
    <h3>Vue動作確認</h3>

    <div>タグからの値: {{ name }}</div>

    <div>
      <RefArea />
    </div>

    <div>
      <UIArea />
    </div>
  </div>
</template>

<script setup lang="ts">
import RefArea from './test-area-vue-admin/RefArea.vue';
import UIArea from './test-area-vue-admin/UIArea.vue';

interface Props {
  name: string;
}

const props = defineProps<Props>();
</script>
