import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setIsLoading, showToast } from '@/services/ui/message';

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
    if (!confirm('削除しますか？')) return;
    console.log(tweet);

    setIsLoading(true);
    await tweetClient.tweetCtrl.deleteTweet(tweet.id);
    setIsLoading(false);

    showToast("削除しました。", 'alert');

    navigate('/');
  };

  /** 更新ボタンクリック時 */
  const onUpdate = async () => {
    navigate(`/${tweet.id}/edit`);
  };

  return (
    <div>
      <h2 className="app-h2">ツイート詳細</h2>

      <div className="my-10">
        <Link to="/" className="app-btn-primary">
          一覧
        </Link>
      </div>

      {tweet ? (
        <div className="mb-4 mt-10">
          <div>content: {tweet.content}</div>
          <div className="mt-10 flex justify-between">
            <button
              type="button"
              onClick={onUpdate}
              className="app-btn-primary"
            >
              更新
            </button>
            <button type="button" onClick={onDelete} className="app-btn-danger">
              削除
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
