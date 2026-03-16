<template>
  <form @submit="onSubmit" class="mb-4 mt-10">
    <div>content: {{ content }}</div>

    <div class="mt-10 space-x-4">
      <button type="button" @click="onBack" class="app-btn-secondary">
        戻る
      </button>

      <button type="submit" class="app-btn-primary">投稿</button>
    </div>
  </form>
</template>

<script setup>
defineProps({
  onSubmit: Function,
  content: String,
  onBack: Function,
});
</script>
