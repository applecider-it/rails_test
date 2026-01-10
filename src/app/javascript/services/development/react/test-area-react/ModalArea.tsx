import { useEffect, useState } from 'react';

import Modal from '@/services/ui/react/popup/Modal';

/** テスト用コンポーネント */
export default function ModalArea() {
  const [open, setOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');

  useEffect(() => {}, []);

  /** モーダルウィンドウの値の確認 */
  const confirmModalValue = () => {
    alert(modalValue);
  };

  return (
    <>
      <div className="space-y-2">
        <div>モーダル動作確認</div>

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
