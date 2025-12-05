<template>
  <div className="mt-5 py-6 border-gray-500 border-2 p-5 space-y-3">
    <div className="mb-6 text-lg">vue動作確認</div>
    <div className="mb-6">name: {{ name }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string;
}

defineProps<Props>();
</script>
