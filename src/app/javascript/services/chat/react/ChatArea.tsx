import { useEffect, useRef, useState } from 'react';

/**
 * チャットコンポーネント
 */
export default function ChatArea({ token }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    // WebSocket 接続
    const ws = new WebSocket(`ws://localhost:8080/ws?token=${token}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);

      // result = { data: { message }, sender: { user_id, email } }
      setMessages((prev) => [
        {
          message: result.data.message,
          userId: result.sender.user_id,
          email: result.sender.email,
        },
        ...prev, // 先頭に追加 → 最新メッセージが上
      ]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (!message) return;

    wsRef.current.send(JSON.stringify({ message }));
    setMessage('');
  };

  return (
    <div>
      <h2 className="app-h2">Chat</h2>

      <div>
        <input
          type="text"
          className="app-form-input w-auto"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
        <button onClick={sendMessage} className="app-btn-primary w-auto">
          Send
        </button>
      </div>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.email} ({msg.userId}): {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
