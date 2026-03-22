<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { setIsLoading, showToast } from '@/services/ui/message';
import FormArea from './tweet-new/FormArea.vue';
import type TweetClient from '../../TweetClient';

type Errors = {
  content?: string[];
};

const props = defineProps<{
  tweetClient: TweetClient;
}>();

const content = ref<string>('');
const errors = ref<Errors>({});

onMounted(() => {
  console.log('init new');
});

/** 送信 */
const onSubmit = async () => {
  setIsLoading(true);

  try {
    await props.tweetClient.tweetCtrl.sendTweet(content.value);

    errors.value = {};

    props.tweetClient.refreshList();

    showToast('ツイートしました。');

    content.value = '';
  } catch (error: any) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors;
    }
  } finally {
    setIsLoading(false);
  }
};
</script>

<template>
  <div>
    <h3 class="app-h3">新規ツイート</h3>

    <FormArea :onSubmit="onSubmit" :errors="errors" v-model:content="content" />
  </div>
</template>
