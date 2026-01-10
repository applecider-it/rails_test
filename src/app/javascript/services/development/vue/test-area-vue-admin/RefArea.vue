<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    "
  >
    <div>Ref動作確認</div>

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

const cnt = ref<number>(0);
</script>
