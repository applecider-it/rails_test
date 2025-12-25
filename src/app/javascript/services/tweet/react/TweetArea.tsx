import { useEffect, useState } from 'react';

import TweetNew from './tweet-area/TweetNew';
import TweetList from './tweet-area/TweetList';

import TweetClient from '../TweetClient';

type Prop = {
  tweetClient: TweetClient;
};

export default function TweetRouter({ tweetClient }: Prop) {
  useEffect(() => {}, []);

  return (
    <div>
      <h2 className="app-h2">ツイート</h2>
      <TweetNew tweetClient={tweetClient} />
      <TweetList tweetClient={tweetClient} />
    </div>
  );
}
