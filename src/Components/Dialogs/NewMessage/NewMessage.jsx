import React from "react";
import { addMessageCreator, updateNewMessageTextCreator } from "../../../Redux/dialogsReducer";
import classes from './NewMessage.module.css';

const NewMessage = (props) => {
    let newMessage = props.newMessage;

    let addMessage = (e) => {
        e.preventDefault();
        let action = addMessageCreator();
        props.dispatch(action);
    }
    let onPostChange = (e) => {
        e.preventDefault();
        let text = e.target.value;
        let action = updateNewMessageTextCreator(text);
        props.dispatch(action);
    }
    return (
        <form action="" className={classes.newMessage__form}>
            <textarea
                rows="10"
                value={newMessage}
                onChange={onPostChange}
            ></textarea>
            <button onClick={addMessage}>Add New Message!!</button>
        </form>
    )
}

export default NewMessage;