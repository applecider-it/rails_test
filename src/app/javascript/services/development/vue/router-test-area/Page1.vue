<template>
  <div class="space-y-2">
    <div>Page1</div>
    <div>
      <button @click="cnt++" class="app-btn-primary">Add</button>
    </div>
    <div>
      <span>cnt: {{ cnt }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const cnt = ref<number>(0);

// 初期化時
onMounted(() => {
  console.log('page1 mounted');
});
</script>
