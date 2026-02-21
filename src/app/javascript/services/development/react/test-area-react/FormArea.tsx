import { useState } from 'react';

type Props = {
  initialListVal: number;
  initialRadioVal: string;
  initialDateTimeVal: string;
  listVals: Record<string, string>;
  radioVals: Record<string, string>;
};

/**
 * Form動作確認
 */
export default function FormArea({
  initialListVal,
  initialRadioVal,
  initialDateTimeVal,
  listVals,
  radioVals,
}: Props) {
  const [listVal, setListVal] = useState<number | null>(initialListVal);
  const [radioVal, setRadioVal] = useState<string>(initialRadioVal);
  const [dateTimeVal, setDateTimeVal] = useState<string>(initialDateTimeVal);

  /** フォームの値の確認 */
  const confirmFormValue = () => {
    console.log('confirmFormValue', {
      listVal,
      radioVal,
      dateTimeVal,
    });
  };

  return (
    <div className="app-form">
      Form動作確認
      <div className="mt-5">
        <label htmlFor="listVal" className="app-form-label">
          リスト動作確認
        </label>
        <div className="my-2">
          <select
            id="listVal"
            value={listVal ?? ''}
            onChange={(e) =>
              setListVal(e.target.value === '' ? null : Number(e.target.value))
            }
          >
            <option value="">選択してください</option>
            {Object.entries(listVals).map(([key, value]) => (
              <option key={key} value={Number(key)}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <p>
          選択中: [{String(listVal)}] {typeof listVal}
        </p>
      </div>
      <div className="mt-5">
        <label className="app-form-label">ラジオボタン動作確認</label>
        <div className="space-x-3 my-2">
          {Object.entries(radioVals).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                value={key}
                checked={radioVal === key}
                onChange={() => setRadioVal(key)}
              />
              &nbsp;
              {value}
            </label>
          ))}
        </div>

        <p>選択中: {radioVal}</p>
      </div>
      <div className="mt-5">
        <label htmlFor="dateTimeVal" className="app-form-label">
          日時動作確認
        </label>
        <div className="my-2">
          <input
            type="datetime-local"
            id="dateTimeVal"
            value={dateTimeVal}
            className="app-form-input"
            style={{ width: 'auto' }}
            onChange={(e) => setDateTimeVal(e.target.value)}
          />
        </div>

        <p>選択中: {dateTimeVal}</p>
      </div>
      <div className="mt-5">
        <button onClick={confirmFormValue} className="app-btn-secondary">
          確認
        </button>
      </div>
    </div>
  );
}
