import { useState } from 'react';

import ModalAdmin from '@/services/ui/react/popup/ModalAdmin';

/** モーダル動作確認 */
export default function ModalArea() {
  const [open, setOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');

  /** モーダルウィンドウの値の確認 */
  const confirmModalValue = () => {
    alert(modalValue);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem',
        }}
      >
        <div>モーダル動作確認</div>

        <div>
          <button onClick={() => setOpen(true)}>モーダルウィンドウ</button>
          <button onClick={confirmModalValue}>確認</button>
        </div>
        <div>modalValue: {modalValue}</div>
      </div>

      <ModalAdmin isOpen={open} onClose={() => setOpen(false)}>
        <h3>モーダルタイトル</h3>

        <div>
          <textarea
            rows={3}
            cols={40}
            placeholder="What's happening?"
            value={modalValue}
            onChange={(e) => setModalValue(e.target.value)}
          />
        </div>

        <button onClick={() => setOpen(false)} style={{marginTop: "1rem"}}>閉じる</button>
      </ModalAdmin>
    </>
  );
}
