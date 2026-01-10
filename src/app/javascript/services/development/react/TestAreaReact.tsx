import UIArea from './test-area-react/UIArea';
import ModalArea from './test-area-react/ModalArea';

/** テスト用コンポーネント */
export default function TestAreaReact({ name }) {
  return (
    <>
      <div className="py-6 border-gray-500 border-2 p-5 space-y-3">
        <div className="text-lg">react動作確認</div>

        <div>タグからの値: {name}</div>

        <div>
          <UIArea />
        </div>

        <div>
          <ModalArea />
        </div>
      </div>
    </>
  );
}
