import { useEffect, useState } from 'react';

import { showToast, setIsLoading } from '@/services/ui/message';
import LoadingInline from '@/services/ui/react/message/LoadingInline';

/** UI動作確認 */
export default function UIArea() {
  const [inline, setInline] = useState(false);

  useEffect(() => {}, []);

  /** ロード画面の動作確認 */
  const loadingTest = () => {
    console.log('Loading');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  const loadingInlineTest = () => {
    console.log('LoadingInline');
    setInline(true);
    setTimeout(() => {
      setInline(false);
    }, 3000);
  };

  /** トーストの動作確認 */
  const toastTest = (type) => {
    const msg = `トーストテスト type:${type}`;
    console.log(msg);
    showToast(msg, type);
  };

  return (
    <div className="space-y-2">
      <div>UI動作確認</div>

      <div>
        <button className="app-btn-primary mr-2" onClick={loadingTest}>
          Loading
        </button>
        <button className="app-btn-primary mr-2" onClick={loadingInlineTest}>
          Loading inline
        </button>
        <div>{inline && <LoadingInline />}</div>
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
    </div>
  );
}
