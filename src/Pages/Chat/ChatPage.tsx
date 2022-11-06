import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startMessagesListening, stopMessagesListening, sendMessage } from '../../Redux/chatReducer';
import { AppStateType } from '../../Redux/reduxStore';

type ChatMessageType = {
  message: string;
  photo: string | null;
  userId: number;
  userName: string;
  id: string;
};

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
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
      <b>{message.id}</b>
    </div>
  );
});

const Messages: React.FC = React.memo(() => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    messagesRef.current?.scrollIntoView({ block: "center" });
  }, [messages])

  return (
    <div style={{ height: '500px', overflow: 'auto' }}>
      {messages.map((m, i) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesRef}></div>
    </div>
  );
});

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const readyStatus = useSelector((state: AppStateType) => state.chat.status);

  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (message === '') {
      return;
    }
    dispatch(sendMessage(message))
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
        <button disabled={readyStatus !== 'ready'} onClick={submitHandler}>Send Message</button>
      </div>
    </form>
  );
};

const Chat: React.FC = () => {
  const readyStatus = useSelector((state: AppStateType) => state.chat.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    }
  }, [dispatch]);

  return (
    <div>
      {readyStatus === 'error' && <div>Error. Refresh page.</div>}
      <Messages />
      <AddMessageForm />
    </div >
  );
};

const ChatPage: React.FC = () => {
  return <Chat />;
};

export default ChatPage;
