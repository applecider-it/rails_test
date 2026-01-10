import { useState } from 'react';

/** state動作確認 */
export default function StateArea() {
  const [cnt, setCnt] = useState(0);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem',
        }}
      >
        <div>state動作確認</div>

        <div>
          <button onClick={() => setCnt(cnt + 1)}>Add</button>
        </div>
        <div>
          <span>cnt: {cnt}</span>
        </div>
      </div>
    </>
  );
}
