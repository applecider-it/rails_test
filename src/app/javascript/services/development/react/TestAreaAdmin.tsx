import { useEffect, useState } from 'react';

/** テスト用コンポーネント */
export default function TestAreaAdmin({ name }) {
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    console.log('admin react init');
  }, []);

  return (
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
    </div>
  );
}
