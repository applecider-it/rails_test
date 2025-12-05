import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setIsLoading, showToast } from '@/services/ui/message';

import TweetClient from '../../TweetClient';

type Prop = {
  tweetClient: TweetClient;
};

/**
 * 新規ツイート画面
 */
export default function TweetNew({ tweetClient }: Prop) {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [isForm, setIsForm] = useState(true);

  useEffect(() => {
    console.log('init new');
  }, []);

  /** ボタンをクリックしたときに、ツイート送信 */
  const onSubmit = async (e) => {
    e.preventDefault();
    const isCommit = !isForm;

    setIsLoading(true);
    try {
      await tweetClient.tweetCtrl.sendTweet(content, isCommit);

      if (isForm) {
        // フォーム画面の時

        // 確認画面へ推移
        setIsForm(false);
      } else {
        // 確認画面の時

        showToast("ツイートしました。");

        // データクリア
        setContent('');
        setErrors({});

        // フォーム画面に戻る
        setIsForm(true);
      }
    } catch (error) {
      if (error.response?.status === 422) {
        // 入力エラーの時

        // 確認画面の時にエラーが発生した場合の、フォーム画面に戻る処理
        setIsForm(true);

        setErrors(error.response.data.errors);
      }
    }
    setIsLoading(false);
  };

  /** 戻るボタンクリック時 */
  const onBack = () => {
    setIsForm(true);
  };

  return (
    <div>
      <h2 className="app-h2">新規ツイート</h2>

      <div className="my-10">
        <Link to="/" className="app-btn-primary">
          一覧
        </Link>
      </div>

      {isForm ? (
        <>
          {/* フォーム画面 */}
          <form onSubmit={onSubmit} className="mb-4 mt-10">
            <textarea
              rows={3}
              className="w-full border rounded p-2"
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {errors.content && (
              <p className="text-red-600">{errors.content[0]}</p>
            )}
            <button type="submit" className="mt-2 app-btn-primary">
              確認
            </button>
          </form>
        </>
      ) : (
        <>
          {/* 確認画面 */}
          <form onSubmit={onSubmit} className="mb-4 mt-10">
            <div>content: {content}</div>
            <div className="mt-10 space-x-4">
              <button
                type="button"
                onClick={onBack}
                className="app-btn-secondary"
              >
                戻る
              </button>
              <button type="submit" className="app-btn-primary">
                投稿
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
