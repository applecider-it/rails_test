import { useEffect, useState } from 'react';
import axios from 'axios';

import { jsonRequestHeaders } from '@/services/api/http';


/** テスト用コンポーネント */
export default function TestAreaReactAdmin({ name, apiUrl }) {
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    console.log('admin react init');
  }, []);

  /** API動作確認 */
  const apiTest = async() => {
    console.log(apiUrl);

    const data = {
      cnt: cnt,
    }

    const headers = jsonRequestHeaders();
    const response = await axios.post(apiUrl, data, {
      headers: headers,
    });

    console.log('response.data', response.data);
  } 

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
      <div>
        <button onClick={apiTest}>API実装例</button>
      </div>
    </div>
  );
}
