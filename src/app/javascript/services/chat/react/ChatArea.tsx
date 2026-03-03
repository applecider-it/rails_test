import React, { useEffect, useMemo, useState, KeyboardEvent } from 'react';
import ChatClient from '../ChatClient';
import { ChatMessage } from '../types';

type Props = {
  chatClient: ChatClient;
};

/** チャットエリアコンポーネント */
export default function ChatArea({ chatClient }: Props) {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  /** 逆順のメッセージリスト */
  const reversedMessages = useMemo(() => {
    return [...messages].reverse();
  }, [messages]);

  /** キーダウン時 */
  const onKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage('websocket');
  };

  /** メッセージ送信 */
  const sendMessage = (type: string) => {
    console.log(message);
    chatClient.sendMessage(message, type);
    setMessage('');
  };

  /** 初期化時 */
  useEffect(() => {
    chatClient.addMessage = (val: ChatMessage) => {
      setMessages((prev) => [...prev, val]);
    };
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          className="app-form-input"
          style={{ maxWidth: '30rem' }}
          value={message}
          placeholder="Message"
          onKeyDown={onKeydown}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => sendMessage('websocket')}
          className="app-btn-primary w-auto ml-2 mt-2"
        >
          Send
        </button>
        <button
          onClick={() => sendMessage('redis')}
          className="app-btn-primary w-auto ml-2 mt-2"
        >
          Send(R)
        </button>
        <button
          onClick={() => sendMessage('actioncable')}
          className="app-btn-primary w-auto ml-2 mt-2"
        >
          Send(AC)
        </button>
        <button
          onClick={() => sendMessage('pusher')}
          className="app-btn-primary w-auto ml-2 mt-2"
        >
          Send(P)
        </button>
      </div>

      <div className="h-72 my-5 overflow-y-scroll border-2">
        <ul>
          {reversedMessages.map((msg, index) => (
            <li key={index} className="p-1">
              {msg.message}
              <span className="ml-3 text-sm text-gray-500">
                {' '}
                by {msg.email} ({msg.userId})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
