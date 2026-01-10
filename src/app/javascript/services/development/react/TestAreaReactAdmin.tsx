import { useEffect } from 'react';

import StateArea from './test-area-react-admin/StateArea';
import ModalArea from './test-area-react-admin/ModalArea';
import ApiArea from './test-area-react-admin/ApiArea';

/** テスト用コンポーネント */
export default function TestAreaReactAdmin({ name, apiUrl }) {
  useEffect(() => {
    console.log('admin react init');
  }, []);

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
          <StateArea />
        </div>

        <div>
          <ApiArea apiUrl={apiUrl} />
        </div>

        <div>
          <ModalArea />
        </div>
      </div>
    </>
  );
}
