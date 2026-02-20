import UIArea from './test-area-react/UIArea';
import ModalArea from './test-area-react/ModalArea';
import FormArea from './test-area-react/FormArea';

type Props = {
  name: string;
  formData: any;
};

/** テスト用コンポーネント */
export default function TestAreaReact({ name, formData }: Props) {
  const blockStyle = {
    border: '2px solid #bbb',
    padding: '1rem',
  };

  return (
    <>
      <div className="py-6 border-gray-500 border-2 p-5 space-y-3">
        <div className="text-lg">react動作確認</div>

        <div>タグからの値: {name}</div>

        <div style={blockStyle}>
          <UIArea />
        </div>

        <div style={blockStyle}>
          <ModalArea />
        </div>

        <div style={blockStyle}>
          <FormArea
            initialListVal={formData.list_val}
            initialRadioVal={formData.radio_val}
            initialDateTimeVal={formData.datetime_val}
            listVals={formData.list_vals}
            radioVals={formData.radio_vals}
          />
        </div>
      </div>
    </>
  );
}
