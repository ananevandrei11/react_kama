import React from "react";
import classes from './NewMessage.module.css';

const NewMessage = (props) => {
    let newMessage = props.newMessage;
    let newMessageELem = React.createRef();

    let addMessage = (e) => {
        e.preventDefault();
        let action = {
            type: 'ADD-MESSAGE'
        };
        props.dispatch(action);
    }
    let onPostChange = (e) => {
        e.preventDefault();
        let text = newMessageELem.current.value;
        let action = {
            type: 'UPDATE-NEW-MESSAGE-TEXT',
            newMessage: text
        };
        props.dispatch(action);
    }
    return (
        <form action="" className={classes.newMessage__form}>
            <textarea
                ref={newMessageELem}
                rows="10"
                value={newMessage}
                onChange={onPostChange}
            ></textarea>
            <button onClick={addMessage}>Add New Message!!</button>
        </form>
    )
}

export default NewMessage;