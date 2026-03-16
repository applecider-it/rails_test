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

<script setup>
import { ref, onMounted } from 'vue';

import LoadingInline from '@/services/ui/vue/message/LoadingInline.vue';
import RowArea from './tweet-list/RowArea.vue';

const props = defineProps({
  tweetClient: Object,
});

const tweetContainers = ref(null);

/** 一覧を最新にする */
const refreshList = async () => {
  const initialTweets = await props.tweetClient.tweetCtrl.getList();

  console.log(initialTweets);

  const list = [];

  for (const tweet of initialTweets) {
    list.push({
      tweet,
      isNew: false,
    });
  }

  tweetContainers.value = list;
};

onMounted(() => {
  props.tweetClient.refreshList = () => {
    refreshList();
  };

  props.tweetClient.refreshList();
});
</script>
