import axios from 'axios';

import { useEffect, useState, useRef } from 'react';

import { showToast, setIsLoading } from '@/services/ui/message';
import ProgressBar from '@/services/ui/react/message/ProgressBar';

let cnt2 = 0;

/** テスト用コンポーネント */
export default function TestArea({}) {
  const [cnt, setCnt] = useState(0);
  const refCnt = useRef(0);
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
    refCnt.current++;
    setCnt(refCnt.current);
    cnt2++;

    const msg = `トーストテスト type:${type} cnt:${cnt} refCnt:${refCnt.current} cnt2:${cnt2}`;
    console.log(msg);
    showToast(msg, type);
  };

  return (
    <div className="py-6 border-gray-500 border-2 p-5 space-y-3">
      <div className="mb-6 text-lg">react動作確認</div>

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
        <span>cnt: {cnt}</span>
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
