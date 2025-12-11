import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setIsLoading, showToast } from '@/services/ui/message';

import LoadingInline from '@/services/ui/react/message/LoadingInline';

import TweetClient from '../../TweetClient';
import { getCurrentUser } from '@/services/application/application';

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

  const currentUser = getCurrentUser();

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

    showToast('削除しました。', 'alert');

    navigate('/');
  };

  console.log('render', currentUser, tweet);

  return (
    <div>
      <h2 className="app-h2">ツイート詳細</h2>

      {tweet ? (
        <div className="mb-4 mt-10">
          <ShowArea tweet={tweet}></ShowArea>
          <CtrlArea {...{ tweet, onDelete, currentUser }}></CtrlArea>
        </div>
      ) : (
        <div>
          <LoadingInline />
        </div>
      )}
    </div>
  );
}

/** 詳細エリア */
const ShowArea = ({ tweet }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200 mb-8">
      {/** ヘッダー */}
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          {/** ユーザーアイコン代用 */}
          <span className="inline-block w-12 h-12 bg-gray-300 rounded-full text-center leading-12 font-bold text-white">
            {tweet.user.email[0].toUpperCase()}
          </span>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {tweet.user.email}
          </h2>
          <p className="text-sm text-gray-500">
            Posted at {new Date(tweet.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      {/** 本文 */}
      <div className="mt-4 text-gray-800 leading-relaxed text-lg">
        <p>{tweet.content}</p>
      </div>
    </div>
  );
};

/** コントロールエリア */
const CtrlArea = ({ tweet, onDelete, currentUser }) => {
  return (
    <div className="mt-10 flex justify-between">
      <div className="space-x-2">
        <Link to="/" className="app-link-normal">
          一覧
        </Link>
        {currentUser.id === tweet.user.id && (
          <>
            <span>|</span>
            <Link to={`/${tweet.id}/edit`} className="app-link-normal">
              更新
            </Link>
          </>
        )}
      </div>
      <div>
        {currentUser.id === tweet.user.id && (
          <button type="button" onClick={onDelete} className="app-btn-danger">
            削除
          </button>
        )}
      </div>
    </div>
  );
};
