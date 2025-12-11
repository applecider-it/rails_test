import axios from 'axios';

import { useEffect, useState, useRef } from 'react';

import { showToast, setIsLoading } from '@/services/ui/message';
import Modal from '@/services/ui/react/popup/Modal';
import LoadingInline from '@/services/ui/react/message/LoadingInline';

/** テスト用コンポーネント */
export default function TestAreaReact({ name }) {
  const [open, setOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');
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

  /** モーダルウィンドウの値の確認 */
  const confirmModalValue = () => {
    alert(modalValue);
  };

  return (
    <>
      <div className="py-6 border-gray-500 border-2 p-5 space-y-3">
        <div className="text-lg">react動作確認</div>

        <div>タグからの値: {name}</div>

        <div>
          <button className="app-btn-primary mr-2" onClick={loadingTest}>
            Loading
          </button>
          <button className="app-btn-primary mr-2" onClick={loadingInlineTest}>
            Loading inline
          </button>
          <div>
            {inline && <LoadingInline />}
          </div>
        </div>

        <div className="space-x-3">
          <button
            className="app-btn-primary"
            onClick={() => toastTest('notice')}
          >
            Toast notice
          </button>
          <button
            className="app-btn-primary"
            onClick={() => toastTest('alert')}
          >
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
          <div className="space-x-2">
            <button className="app-btn-primary" onClick={() => setOpen(true)}>
              モーダルウィンドウ
            </button>
            <button onClick={confirmModalValue} className="app-btn-secondary">
              確認
            </button>
          </div>
          <div>modalValue: {modalValue}</div>
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-bold mb-2">モーダルタイトル</h2>

        <div className="my-4">
          <textarea
            rows={3}
            cols={40}
            className="w-full border rounded p-2"
            placeholder="What's happening?"
            value={modalValue}
            onChange={(e) => setModalValue(e.target.value)}
          />
        </div>

        <button onClick={() => setOpen(false)} className="app-btn-secondary">
          閉じる
        </button>
      </Modal>
    </>
  );
}
