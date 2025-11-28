<template>
  <h2>Hello Vue {{ name }}</h2>
</template>

<script setup lang="ts">
interface Props {
  name: string;
}

defineProps<Props>();
</script>
