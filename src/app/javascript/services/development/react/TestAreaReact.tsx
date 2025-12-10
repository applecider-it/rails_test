import axios from 'axios';

import { useEffect, useState, useRef } from 'react';

import { showToast, setIsLoading } from '@/services/ui/message';
import ProgressBar from '@/services/ui/react/message/ProgressBar';

/** テスト用コンポーネント */
export default function TestAreaReact({ name }) {
  const [progress, setProgress] = useState(0); // 0〜100

  useEffect(() => {}, []);

  /** ロード画面の動作確認 */
  const loadingTest = () => {
    console.log('Loading');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  /** トーストの動作確認 */
  const toastTest = (type) => {
    const msg = `トーストテスト type:${type}`;
    console.log(msg);
    showToast(msg, type);
  };

  return (
    <div className="py-6 border-gray-500 border-2 p-5 space-y-3">
      <div className="text-lg">react動作確認</div>

      <div>タグからの値: {name}</div>

      <div>
        <button className="app-btn-primary mr-2" onClick={loadingTest}>
          Loading
        </button>
      </div>

      <div className="space-x-3">
        <button className="app-btn-primary" onClick={() => toastTest('notice')}>
          Toast notice
        </button>
        <button className="app-btn-primary" onClick={() => toastTest('alert')}>
          Toast alert
        </button>
        <button
          className="app-btn-primary"
          onClick={() => {
            toastTest('notice');
            toastTest('alert');
          }}
        >
          Toast 2
        </button>
      </div>

      <div className="space-y-2">
        <ProgressBar progress={progress} />

        {/* ボタン */}
        <button
          onClick={() => setProgress(progress + 10)}
          className="app-btn-primary"
        >
          進める
        </button>
      </div>
    </div>
  );
}
