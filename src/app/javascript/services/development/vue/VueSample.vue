<template>
  <h2>Hello from Vue + Vite + Rails {{ name }}🎉</h2>
</template>

<script setup lang="ts">
interface Props {
  name: string
}

defineProps<Props>()
</script>