import React from 'react';
import classes from './Dialogs.module.css';
import DialogMessage from './DialogMessage/DialogsMessage';
import DialogUser from './DialogUser/DialogsUser';
import NewMessageContainer from './NewMessage/NewMessageContainer';
import { MessagesType, UsersMessagesType } from '../../Types/types';

type DialogsPropsType = {
  users: UsersMessagesType[];
  messages: MessagesType[];
};

const Dialogs: React.FC<DialogsPropsType> = (props) => {
  return (
    <div className={classes.dialogs}>
      <aside className={classes.names}>
        {props.users.map((user) => (
          <DialogUser key={user.id} id={user.id} name={user.name} />
        ))}
      </aside>
      <section>
        {props.messages.map((message) => (
          <DialogMessage key={message.id} message={message.text} />
        ))}
      </section>
      <section className={classes.newMessage}>
        <NewMessageContainer />
      </section>
    </div>
  );
};

export default Dialogs;
