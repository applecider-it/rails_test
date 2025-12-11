import { Toasts, Toast } from '../../types';

type Props = {
  toasts: Toasts;
};

/** トーストリストコンポーネント */
export default function ToastsAdmin({ toasts }: Props) {
  const computedStyle = (toast: Toast): React.CSSProperties => {
    const bgColor = toast.type === 'alert' ? '#f44' : '#44f';

    return {
      fontSize: '0.9rem',
      background: bgColor,
      border: '2px solid #374151',
      color: 'white',
      padding: '0.3rem 1rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      animation:
        'app-local_javascript_services_ui_react_message_ToastsAdmin-slide-in 0.3s ease-out',
    };
  };

  return (
    <>
      <style>{`
      /* トーストアニメーション */
      @keyframes app-local_javascript_services_ui_react_message_ToastsAdmin-slide-in {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      `}</style>
      <div
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} style={computedStyle(toast)}>
            {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}
