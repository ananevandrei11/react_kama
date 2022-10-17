import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startMessagesListening, stopMessagesListening, sendMessage } from '../../Redux/chatReducer';
import { AppStateType } from '../../Redux/reduxStore';

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

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);

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
  // const [readyStatus, setReadySTatus] = useState<'pending' | 'ready'>('pending');

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
        <button onClick={submitHandler}>Send Message</button>
      </div>
    </form>
  );
};

const Chat: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    }
  }, []);

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
