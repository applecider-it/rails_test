import { Toasts, Toast } from '../../types';

type Props = {
  toasts: Toasts;
};

/** トーストリストコンポーネント */
export default function ToastsComponent({ toasts }: Props) {
  const computedClass = (toast: Toast) => {
    const color = toast.type === 'alert' ? 'red-300' : 'blue-300';
    return `text-md bg-${color} border-4 border-gray-700 text-black px-4 py-2 rounded-lg shadow-lg animate-slide-in`;
  };

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => {
        return (
          <div key={toast.id} className={computedClass(toast)}>
            {toast.message}
          </div>
        );
      })}
    </div>
  );
}
