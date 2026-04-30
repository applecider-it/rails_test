<script setup lang="ts">
import { ref } from 'vue'
import AppLayout from '@/components/layouts/AppLayout.vue'
import TweetList from '@/components/tweet/TweetList.vue';
</script>

<template>
  <AppLayout name="ツイート一覧">
    <div>
      <TweetList />
    </div>
  </AppLayout>
</template>