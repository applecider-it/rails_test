<script setup lang="ts">
import { onMounted } from 'vue';

import TweetNew from './tweet-area/TweetNew.vue';
import TweetList from './tweet-area/TweetList.vue';
import type TweetClient from '../TweetClient';

const props = defineProps<{
  tweetClient: TweetClient;
}>();

const tweetClient = props.tweetClient;

onMounted(() => {
  // Reactの useEffect(() => {}, [])
});
</script>

<template>
  <div>
    <h2 class="app-h2">ツイート</h2>

    <TweetNew :tweetClient="tweetClient" />
    <TweetList :tweetClient="tweetClient" />
  </div>
</template>
