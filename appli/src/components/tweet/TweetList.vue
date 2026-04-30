<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getList } from '@/services/tweet/list';

const tweets = ref<any[]>([]);

onMounted(async () => {
  console.log('aaa');
  const ret = await getList();
  console.log(ret);

  tweets.value = ret.tweets;
});
</script>

<template>
  <div class="max-w-2xl mx-auto px-4">
    <!-- ツイート一覧 -->
    <div
      v-for="tweet in tweets"
      :key="tweet.id"
      class="bg-white rounded-2xl shadow-md p-4 mb-4 hover:shadow-lg transition"
    >
      <!-- 本文 -->
      <div class="text-gray-900 text-base mb-3 leading-relaxed">
        {{ tweet.content }}
      </div>

      <!-- ユーザー -->
      <div class="text-sm text-gray-500">
        by
        <span class="font-medium text-gray-700">
          {{ tweet.user.email }}
        </span>
      </div>
    </div>
  </div>
</template>
