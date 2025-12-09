import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setIsLoading, showToast } from '@/services/ui/message';

import TweetClient from '../../TweetClient';

type Prop = {
  tweetClient: TweetClient;
};

/**
 * ツイート更新画面
 */
export default function TweetEdit({ tweetClient }: Prop) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tweet, setTweet] = useState<any>(null);

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [isForm, setIsForm] = useState(true);

  useEffect(() => {
    console.log('init edit');

    init();
  }, []);

  /** 初期化 */
  const init = async () => {
    const resultTweet = await tweetClient.tweetCtrl.getTweet(id);

    console.log(resultTweet);

    setTweet(resultTweet);
    setContent(resultTweet.content);
  };

  /** ボタンをクリックしたときに、ツイート送信 */
  const onSubmit = async (e) => {
    e.preventDefault();
    const isCommit = !isForm;

    setIsLoading(true);
    try {
      await tweetClient.tweetCtrl.putTweet(tweet.id, content, isCommit);

      if (isForm) {
        // フォーム画面の時

        // 確認画面へ推移
        setIsForm(false);
      } else {
        // 確認画面の時

        showToast('更新しました。');
        navigate(`/${tweet.id}`);
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
      <h2 className="app-h2">ツイート更新</h2>

      {tweet && (
        <>
          {isForm ? (
            <FormArea {...{ onSubmit, content, setContent, errors }}></FormArea>
          ) : (
            <ConfirmArea {...{ onSubmit, content, onBack }}></ConfirmArea>
          )}

          <div className="space-x-2 my-10">
            <Link to="/" className="app-link-normal">
              一覧
            </Link>
            <span>|</span>
            <Link to={`/${tweet.id}`} className="app-link-normal">
              詳細
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

/** フォームエリア */
const FormArea = ({ onSubmit, content, setContent, errors }) => {
  return (
    <form onSubmit={onSubmit} className="mb-4 mt-10">
      <textarea
        rows={3}
        className="w-full border rounded p-2"
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {errors.content && <p className="text-red-600">{errors.content[0]}</p>}
      <div className="space-x-5">
        <button type="submit" className="mt-2 app-btn-primary">
          確認
        </button>
      </div>
    </form>
  );
};

/** 確認エリア */
const ConfirmArea = ({ onSubmit, content, onBack }) => {
  return (
    <form onSubmit={onSubmit} className="mb-4 mt-10">
      <div>content: {content}</div>
      <div className="mt-10 space-x-4">
        <button type="button" onClick={onBack} className="app-btn-secondary">
          戻る
        </button>
        <button type="submit" className="app-btn-primary">
          確定
        </button>
      </div>
    </form>
  );
};

