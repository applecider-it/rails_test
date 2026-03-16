<template>
  <div>
    <h3 class="app-h3">新規ツイート</h3>

    <FormArea
      v-if="isForm"
      :onSubmit="onSubmit"
      :content="content"
      :errors="errors"
      @update:content="content = $event"
    />

    <ConfirmArea
      v-else
      :onSubmit="onSubmit"
      :content="content"
      :onBack="onBack"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { setIsLoading, showToast } from '@/services/ui/message';

import FormArea from './tweet-new/FormArea.vue';
import ConfirmArea from './tweet-new/ConfirmArea.vue';

const props = defineProps({
  tweetClient: Object,
});

const content = ref('');
const errors = ref({});
const isForm = ref(true);

onMounted(() => {
  console.log('init new');
});

/** 送信 */
const onSubmit = async (e) => {
  e.preventDefault();

  const isCommit = !isForm.value;

  setIsLoading(true);

  try {
    const result = await props.tweetClient.tweetCtrl.sendTweet(
      content.value,
      isCommit,
    );

    errors.value = {};

    if (isForm.value) {
      // 確認画面へ
      isForm.value = false;
    } else {
      // 投稿完了
      props.tweetClient.refreshList();

      showToast('ツイートしました。');

      content.value = '';
      isForm.value = true;
    }
  } catch (error) {
    if (error.response?.status === 422) {
      isForm.value = true;
      errors.value = error.response.data.errors;
    }
  }

  setIsLoading(false);
};

/** 戻る */
const onBack = () => {
  isForm.value = true;
};
</script>
