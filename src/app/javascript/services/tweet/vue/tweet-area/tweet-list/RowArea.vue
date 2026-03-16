<template>
  <div class="border rounded p-4">
    <p v-if="tweetContainer.isNew" class="text-blue-500">new</p>

    <p class="text-gray-800">
      {{ tweetContainer.tweet.content }}
    </p>

    <p class="text-gray-500 text-sm">
      by {{ tweetContainer.tweet.user.email }} -
      {{ formatDate(tweetContainer.tweet.created_at) }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  tweetContainer: Object,
});

const formatDate = (date) => {
  return new Date(date).toLocaleString();
};
</script>
