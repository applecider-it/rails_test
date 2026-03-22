<script setup lang="ts">
import { ref, onMounted } from 'vue';

import LoadingInline from '@/services/ui/vue/message/LoadingInline.vue';
import RowArea from './tweet-list/RowArea.vue';
import { TweetContainer } from '../../types';
import type TweetClient from '../../TweetClient';

const props = defineProps<{
  tweetClient: TweetClient;
}>();

const tweetContainers = ref<TweetContainer[] | null>(null);

/** 一覧を最新にする */
const refreshList = async (): Promise<void> => {
  const initialTweets = await props.tweetClient.tweetCtrl.getList();

  const list: TweetContainer[] = initialTweets.map((tweet) => ({
    tweet,
  }));

  tweetContainers.value = list;
};

onMounted(() => {
  props.tweetClient.refreshList = refreshList;
  props.tweetClient.refreshList();
});
</script>

<template>
  <div>
    <h3 class="app-h3">ツイート一覧</h3>

    <div v-if="tweetContainers">
      <div class="space-y-4 mt-10">
        <RowArea
          v-for="tweetContainer in tweetContainers"
          :key="tweetContainer.tweet.id"
          :tweetContainer="tweetContainer"
        />
      </div>
    </div>

    <div v-else>
      <LoadingInline />
    </div>
  </div>
</template>