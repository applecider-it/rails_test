/** ローディングコンポーネント */
export default function LoadingAdmin({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: '0',
    background: 'rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    userSelect: 'none',
  };

  const spinnerStyle: React.CSSProperties = {
    width: '2.5rem',
    height: '2.5rem',
    border: '4px solid #6b7280',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation:
      'app-local__javascript__services__ui__react__message__LoadingAdmin__loading-spin 0.8s linear infinite',
    boxShadow: '0 0 4px rgba(0,0,0,0.3)',
  };

  return (
    <>
      <style>{`
      /* ローディングアニメーション */
      @keyframes app-local__javascript__services__ui__react__message__LoadingAdmin__loading-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      } 
      `}</style>
      <div style={overlayStyle}>
        <div style={spinnerStyle}></div>
      </div>
    </>
  );
}
