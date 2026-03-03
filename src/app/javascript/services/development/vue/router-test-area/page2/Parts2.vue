<template>
  <div class="space-y-2">
    <div>Parts2</div>
    <div>
      <button @click="cnt++" class="app-btn-primary">Add</button>
    </div>
    <div>
      <button @click="commonCnt++" class="app-btn-primary">Add Common</button>
    </div>
    <div>
      <span>cnt: {{ cnt }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const commonCnt = defineModel<number>("commonCnt");

const cnt = ref<number>(0);

// 初期化時
onMounted(() => {
  console.log('parts2 mounted');
});
</script>
