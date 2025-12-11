import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import LoadingInline from '@/services/ui/react/message/LoadingInline';

import TweetClient from '../../TweetClient';

type Prop = {
  tweetClient: TweetClient;
};

/** 一覧ページ */
export default function TweetList({ tweetClient }: Prop) {
  const [tweetContainers, setTweetContainers] = useState(null);

  useEffect(() => {
    console.log('init list');

    init();
  }, []);

  /** 初期化 */
  const init = async () => {
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
      <h2 className="app-h2">ツイート一覧</h2>

      <div className="my-10">
        <Link to="/new" className="app-btn-primary">
          新規作成
        </Link>
      </div>

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
      <div className="mt-4">
        <Link to={`/${tweetContainer.tweet.id}`} className="app-link-normal">
          参照
        </Link>
      </div>
    </div>
  );
};
