import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { setIsLoading } from '@/services/ui/message';

import TweetClient from "../../TweetClient";

type Prop = {
  tweetClient : TweetClient;
};

export default function TweetNew({tweetClient}: Prop) {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    console.log('init new');
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await tweetClient.tweetCtrl.sendTweet(content);

      setContent('');
      setErrors({});
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <Link to="/" className="app-btn-primary">
          一覧
        </Link>
      </div>

      <form onSubmit={onSubmit} className="mb-4 mt-10">
        <textarea
          rows={3}
          className="w-full border rounded p-2"
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errors.content && (
          <p className="app-error-text">{errors.content[0]}</p>
        )}
        <button type="submit" className="mt-2 app-btn-primary">
          Tweet
        </button>
      </form>
    </div>
  );
}
