import React, { useState, useEffect } from 'react';

type ChatMessageType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
};

const ws = new WebSocket(
  'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
);

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img
        src={
          message.photo ? message.photo : 'https://www.fillmurray.com/100/100'
        }
        alt={message.userName}
        style={{ borderRadius: '50%' }}
      />
      <span>{message.message}</span>
      <b>{message.userName}</b>
    </div>
  );
};

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  useEffect(() => {
    ws.addEventListener('message', (e) => {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)]);
    });
  }, []);

  return (
    <div style={{ height: '500px', overflow: 'auto' }}>
      {messages.map((m, i) => (
        <Message key={i + m.message} message={m} />
      ))}
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const sendMessage = (e: any) => {
    e.preventDefault();
    if (message === '') {
      return;
    }
    ws.send(message);
    setMessage('');
  };

  return (
    <form>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
          name="message"
          id="message"
        ></textarea>
      </div>
      <div>
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </form>
  );
};

const Chat: React.FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const ChatPage: React.FC = () => {
  return <Chat />;
};

export default ChatPage;
