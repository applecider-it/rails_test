import { useEffect, useState } from 'react';

/**
 * チャットコンポーネント
 */
export default function ChatArea({ chatClient }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    chatClient.setMessage = setMessage;
    chatClient.setMessages = setMessages;
  }, []);

  /** メッセージ送信 */
  const sendMessage = () => {
    chatClient.sendMessage(message);
  }

  return (
    <div>
      <div>
        <input
          type="text"
          className="app-form-input"
          style={{ maxWidth: '30rem' }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
        <button onClick={sendMessage} className="app-btn-primary w-auto ml-2 mt-2">
          Send
        </button>
      </div>

      <div className="h-72 my-5 overflow-y-scroll border-2">
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="p-1">
              {msg.message}
              <span className="ml-3 text-sm text-gray-500">
                by {msg.email}({msg.userId})
              </span>
            </li>
          ))}
        </ul>        
      </div>
    </div>
  );
}
