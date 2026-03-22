<script setup lang="ts">
import { ref, onMounted } from 'vue';

import LoadingInline from '@/services/ui/vue/message/LoadingInline.vue';
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
        <div
          v-for="tweetContainer in tweetContainers"
          :key="tweetContainer.tweet.id"
          :tweetContainer="tweetContainer"
          class="border rounded p-4"
        >
          <p class="text-gray-800">
            {{ tweetContainer.tweet.content }}
          </p>

          <p class="text-gray-500 text-sm">
            by {{ tweetContainer.tweet.user.email }} -
            {{ new Date(tweetContainer.tweet.created_at).toLocaleString() }}
          </p>
        </div>
      </div>
    </div>

    <div v-else>
      <LoadingInline />
    </div>
  </div>
</template>
