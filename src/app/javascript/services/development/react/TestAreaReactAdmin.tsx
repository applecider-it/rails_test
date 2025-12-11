import { useEffect, useState } from 'react';
import axios from 'axios';

import { jsonRequestHeaders } from '@/services/api/http';
import ModalAdmin from '@/services/ui/react/popup/ModalAdmin';

/** テスト用コンポーネント */
export default function TestAreaReactAdmin({ name, apiUrl }) {
  const [cnt, setCnt] = useState(0);

  const [open, setOpen] = useState(false);
  const [modalValue, setModalValue] = useState('');

  useEffect(() => {
    console.log('admin react init');
  }, []);

  /** API動作確認 */
  const apiTest = async () => {
    console.log(apiUrl);

    const data = {
      cnt: cnt,
    };

    const headers = jsonRequestHeaders();
    const response = await axios.post(apiUrl, data, {
      headers: headers,
    });

    console.log('response.data', response.data);
  };

  /** モーダルウィンドウの値の確認 */
  const confirmModalValue = () => {
    alert(modalValue);
  };

  return (
    <>
      <div
        style={{
          border: '1px solid #aaa',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <h3>React動作確認</h3>
        <div>タグからの値: {name}</div>
        <div>
          <button onClick={() => setCnt(cnt + 1)}>Add</button>
        </div>
        <div>
          <span>cnt: {cnt}</span>
        </div>
        <div>
          <button onClick={apiTest}>API実装例</button>
        </div>

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
