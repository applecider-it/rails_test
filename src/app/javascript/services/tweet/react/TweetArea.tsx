import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import TweetNew from './tweet-area/TweetNew';
import TweetList from './tweet-area/TweetList';
import TweetShow from './tweet-area/TweetShow';
import TweetEdit from './tweet-area/TweetEdit';

import TweetClient from '../TweetClient';

type Prop = {
  tweetClient: TweetClient;
};

export default function TweetApp({ tweetClient }: Prop) {
  useEffect(() => {}, []);

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<TweetList tweetClient={tweetClient} />} />
          <Route path="/new" element={<TweetNew tweetClient={tweetClient} />} />
          <Route
            path="/:id"
            element={<TweetShow tweetClient={tweetClient} />}
          />
          <Route
            path="/:id/edit"
            element={<TweetEdit tweetClient={tweetClient} />}
          />
        </Routes>
      </HashRouter>
    </div>
  );
}
