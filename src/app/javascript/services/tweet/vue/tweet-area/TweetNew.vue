<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { setIsLoading, showToast } from '@/services/ui/message';
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

    <form @submit.prevent="onSubmit" class="mb-4 mt-10" id="tweetForm">
      <textarea
        rows="3"
        class="w-full border rounded p-2"
        placeholder="What's happening?"
        name="content"
        v-model="content"
      />

      <p v-if="errors?.content" class="text-red-600">
        {{ errors.content[0] }}
      </p>

      <button type="submit" class="mt-2 app-btn-primary">確認</button>
    </form>
  </div>
</template>
