<script setup lang="ts">
import { TweetContainer } from '../../../types';

const props = defineProps<{
  tweetContainer: TweetContainer;
}>();

const formatDate = (date: string): string => {
  return new Date(date).toLocaleString();
};
</script>

<template>
  <div class="border rounded p-4">
    <p class="text-gray-800">
      {{ tweetContainer.tweet.content }}
    </p>

    <p class="text-gray-500 text-sm">
      by {{ tweetContainer.tweet.user.email }} -
      {{ formatDate(tweetContainer.tweet.created_at) }}
    </p>
  </div>
</template>
