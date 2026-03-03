<template>
  <h2 class="app-h2">Page1</h2>

  <div class="space-y-2 mt-5">
    <div>
      <button @click="cnt++" class="app-btn-primary">Add</button>
    </div>
    <div>
      <span>cnt: {{ cnt }}</span>
    </div>
    <div v-if="user">
      <span>auth user: {{ user.email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCurrentUser } from '@/services/application/application';

const cnt = ref<number>(0);

const user = ref(null);

// 初期化時
onMounted(() => {
  console.log('page1 mounted');

  user.value = getCurrentUser();

  console.log('user.value', user.value);
});
</script>
