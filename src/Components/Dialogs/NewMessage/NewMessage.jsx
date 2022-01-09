import React from "react";
import classes from './NewMessage.module.css';

const NewMessage = (props) => {
    let newMessageELem = React.createRef();

    let addMessage = (e) => {
        e.preventDefault();
        props.addMessage();
    }
    let onPostChange = (e) => {
        e.preventDefault();
        let text = newMessageELem.current.value;
        props.updateMessage(text);
    }
    return (
        <form action="" className={classes.newMessage__form}>
            <textarea
                ref={newMessageELem}
                name="newmessage"
                id="newmessage"
                cols="30"
                rows="10"
                value={props.newMessage}
                onChange={onPostChange}
            ></textarea>
            <button onClick={addMessage}>Add New Message</button>
        </form>
    )
}

export default NewMessage;