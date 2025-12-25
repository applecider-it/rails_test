import { useEffect, useState } from 'react';

import LoadingInline from '@/services/ui/react/message/LoadingInline';

import TweetClient from '../../TweetClient';

type Prop = {
  tweetClient: TweetClient;
};

/** 一覧エリア */
export default function TweetList({ tweetClient }: Prop) {
  const [tweetContainers, setTweetContainers] = useState(null);

  useEffect(() => {
    tweetClient.refreshList = () => {
      refreshList();
    };

    tweetClient.refreshList();
  }, []);

  /** 一覧を最新の状態にする */
  const refreshList = async () => {
    const initialTweets = await tweetClient.tweetCtrl.getList();

    console.log(initialTweets);

    const list: any = [];
    for (const tweet of initialTweets) {
      list.push({
        tweet,
        isNew: false,
      });
    }
    setTweetContainers(list);
  };

  return (
    <div>
      <h3 className="app-h3">ツイート一覧</h3>

      {tweetContainers ? (
        <div className="space-y-4 mt-10">
          {tweetContainers.map((tweetContainer) => (
            <RowArea
              tweetContainer={tweetContainer}
              key={tweetContainer.tweet.id}
            ></RowArea>
          ))}
        </div>
      ) : (
        <div>
          <LoadingInline />
        </div>
      )}
    </div>
  );
}

/** 行エリア */
const RowArea = ({ tweetContainer }) => {
  return (
    <div key={tweetContainer.tweet.id} className="border rounded p-4">
      {tweetContainer.isNew ? <p className="text-blue-500">new</p> : null}
      <p className="text-gray-800">{tweetContainer.tweet.content}</p>
      <p className="text-gray-500 text-sm">
        by {tweetContainer.tweet.user.email} -{' '}
        {new Date(tweetContainer.tweet.created_at).toLocaleString()}
      </p>
    </div>
  );
};
