/**
 * ツイート画面のセットアップ
 */

import { createApp } from 'vue';
import TweetArea from './vue/TweetArea.vue';

import TweetClient from './TweetClient';

const el = document.getElementById('tweet-root');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log(all);

  const tweetClient = new TweetClient(all.token, all.wsHost, all.user);

  createApp(TweetArea, {
    tweetClient: tweetClient,
  }).mount(el);
}
