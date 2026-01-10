import axios from 'axios';

import { jsonRequestHeaders } from '@/services/api/http';

/** API動作確認 */
export default function ApiArea({ apiUrl }) {
  /** API実行 */
  const apiTest = async () => {
    console.log(apiUrl);

    const data = {
      cnt: 1234,
    };

    const headers = jsonRequestHeaders();
    const response = await axios.post(apiUrl, data, {
      headers: headers,
    });

    console.log('response.data', response.data);
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
        <div>API動作確認</div>

        <div>
          <button onClick={apiTest}>API実装例</button>
        </div>
      </div>
    </>
  );
}
