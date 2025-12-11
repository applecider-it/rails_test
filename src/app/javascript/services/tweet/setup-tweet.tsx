/**
 * ツイート画面のセットアップ
 */

import { createRoot } from 'react-dom/client';
import TweetRouter from './react/TweetRouter';

import TweetClient from './TweetClient';

const el: any = document.getElementById('tweet-root');

if (el) {
  const all = JSON.parse(el.dataset.all);

  console.log(all);

  const tweetClient = new TweetClient(all.token, all.wsHost, all.user);

  const root = createRoot(el);
  root.render(
    <TweetRouter tweetClient={tweetClient} />
  );
}
