<template>
  <form @submit="onSubmit" class="mb-4 mt-10" id="tweetForm">
    <textarea
      rows="3"
      class="w-full border rounded p-2"
      placeholder="What's happening?"
      :value="content"
      name="content"
      @input="$emit('update:content', $event.target.value)"
    />

    <p v-if="errors.content" class="text-red-600">
      {{ errors.content[0] }}
    </p>

    <button type="submit" class="mt-2 app-btn-primary">確認</button>
  </form>
</template>

<script setup>
defineProps({
  onSubmit: Function,
  content: String,
  errors: Object,
});
</script>
