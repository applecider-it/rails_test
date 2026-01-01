type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

/**
 * モーダルウィンドウ（Tailwind なし・インラインスタイル版）
 */
export default function Modal({ isOpen, onClose, children }: Props) {
  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    transitionProperty: 'opacity',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
    transitionDuration: '500ms',
  };

  if (isOpen) {
    backdropStyle.pointerEvents = 'auto';
    backdropStyle.opacity = 1;
  } else {
    backdropStyle.pointerEvents = 'none';
    backdropStyle.opacity = 0;
  }
  const contentStyle: React.CSSProperties = {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  };

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
