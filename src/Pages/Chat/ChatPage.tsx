import React, { useState, useEffect } from 'react';

type ChatMessageType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
};

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

const Messages: React.FC<{ wsChannel: WebSocket }> = ({ wsChannel }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  useEffect(() => {
    function subscribeChannel(e: any) {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)]);
    }
    wsChannel?.addEventListener('message', subscribeChannel);
    return () => wsChannel?.removeEventListener('message', subscribeChannel);
  }, [wsChannel]);

  return (
    <div style={{ height: '500px', overflow: 'auto' }}>
      {messages.map((m, i) => (
        <Message key={i + m.message} message={m} />
      ))}
    </div>
  );
};

const AddMessageForm: React.FC<{ wsChannel: WebSocket }> = ({ wsChannel }) => {
  const [message, setMessage] = useState<string>('');
  const [readyStatus, setReadySTatus] = useState<'pending' | 'ready'>('pending');

  useEffect(() => {
    const ready = () => setReadySTatus('ready');
    wsChannel?.addEventListener('open', ready);
    return () => wsChannel?.removeEventListener('open', ready);
  }, [wsChannel]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (message === '') {
      return;
    }
    wsChannel?.send(message);
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
        <button disabled={readyStatus !== 'ready'} onClick={sendMessage}>Send Message</button>
      </div>
    </form>
  );
};

const Chat: React.FC = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    function reconnectChannel() {
      setTimeout(() => createChannel(), 3000);
    }
    function createChannel() {
      ws?.removeEventListener('close', reconnectChannel);
      ws?.close();
      ws = new WebSocket(
        'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
      );
      ws?.addEventListener('close', reconnectChannel);
      setWsChannel(ws);
    }
    createChannel();
    return () => {
      ws?.removeEventListener('close', reconnectChannel);
      ws?.close();
    }
  }, []);

  useEffect(() => {
    if (wsChannel !== null) {
      wsChannel.addEventListener('close', () => console.log('close'));
    }
  }, [wsChannel]);

  return (
    <div>
      {wsChannel ? (
        <>
          <Messages wsChannel={wsChannel} />
          <AddMessageForm wsChannel={wsChannel} />
        </>
      ) : (<div>Loading...</div>)}
    </div>
  );
};

const ChatPage: React.FC = () => {
  return <Chat />;
};

export default ChatPage;
