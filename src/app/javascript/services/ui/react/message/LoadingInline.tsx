import styles from "./LoadingInline.module.css";

/**
 * Reactコードに埋め込む用のLoading
 */
export default function LoadingInline() {
  return (
    <>
      <div
        className={`
          flex space-x-2 justify-center items-center my-28
          opacity-0
           ${styles.fadeInAccel}
        `}
      >
        <span className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
        <span className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
      </div>
    </>
  );
}
