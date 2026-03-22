<template>
  <div>
    <h3 class="app-h3">新規ツイート</h3>

    <FormArea
      :onSubmit="onSubmit"
      :errors="errors"
      :content="content"
      @update:content="content = $event"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { setIsLoading, showToast } from '@/services/ui/message';

import FormArea from './tweet-new/FormArea.vue';

const props = defineProps({
  tweetClient: Object,
});

const content = ref('');
const errors = ref({});

onMounted(() => {
  console.log('init new');
});

/** 送信 */
const onSubmit = async (e) => {
  e.preventDefault();

  setIsLoading(true);

  try {
    const result = await props.tweetClient.tweetCtrl.sendTweet(content.value);

    errors.value = {};

    props.tweetClient.refreshList();

    showToast('ツイートしました。');

    content.value = '';
  } catch (error) {
    if (error.response?.status === 422) {
      errors.value = error.response.data.errors;
    }
  }

  setIsLoading(false);
};
</script>
