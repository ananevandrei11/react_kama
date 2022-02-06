import React from "react";
import classes from './Dialogs.module.css';
import DialogMessage from "./DialogMessage/DialogsMessage";
import DialogUser from "./DialogUser/DialogsUser";
import NewMessage from "./NewMessage/NewMessage";

const Dialogs = (props) => {
    let users = props.dialogPage.users;
    let messages = props.dialogPage.messages;

    return (
        <div className={classes.dialogs}>
            <aside className={classes.names}>
                {users.map((user) =>
                    <DialogUser key={user.id} id={user.id} name={user.name} />
                )}
            </aside>
            <section >
                {messages.map((message) =>
                    <DialogMessage key={message.id} message={message.text} />
                )}
            </section>
            <section className={classes.newMessage}>
                <NewMessage
                    newMessage={props.dialogPage.newMessage}
                    dispatch={props.dispatch}
                />
            </section>
        </div>
    );
}

export default Dialogs;