import { useParams, Link, useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setIsLoading } from '@/services/ui/message';

import TweetClient from '../../TweetClient';

type Prop = {
  tweetClient: TweetClient;
};

/**
 * ツイート詳細画面
 */
export default function TweetShow({ tweetClient }: Prop) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tweet, setTweet] = useState<any>(null);

  useEffect(() => {
    console.log('init show', id);

    init();
  }, []);

  /** 初期化 */
  const init = async () => {
    const resultTweet = await tweetClient.tweetCtrl.getTweet(id);

    console.log(resultTweet);

    setTweet(resultTweet);
  };

  /** 削除ボタンクリック時 */
  const onDelete = async () => {
    console.log(tweet);

    await tweetClient.tweetCtrl.deleteTweet(tweet.id);

    navigate("/");
  };

  return (
    <div>
      <div>
        <Link to="/" className="app-btn-primary">
          一覧
        </Link>
      </div>

      {tweet ? (
        <div className="mb-4 mt-10">
          <div>content: {tweet.content}</div>
          <div className="mt-10 space-x-4">
            <button type="button" onClick={onDelete} className="app-btn-danger">
              削除
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
