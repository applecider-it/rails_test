<template>
  <div>
    <h2 class="app-h2">ツイート</h2>

    <TweetNew :tweetClient="tweetClient" />
    <TweetList :tweetClient="tweetClient" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

import TweetNew from './tweet-area/TweetNew.vue';
import TweetList from './tweet-area/TweetList.vue';

const props = defineProps({
  tweetClient: Object,
});

const tweetClient = props.tweetClient;

onMounted(() => {
  // Reactの useEffect(() => {}, [])
});
</script>
