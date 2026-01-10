<template>
  <div class="space-y-2">
    <div>Ref動作確認</div>
    <div>
      <button @click="cnt++" class="app-btn-primary">Add</button>
    </div>
    <div>
      <span>cnt: {{ cnt }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const cnt = ref<number>(0);
</script>
