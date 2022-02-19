import React from "react";
import classes from './NewMessage.module.css';

const NewMessage = (props) => {
  let newMessage = props.newMessage;

  let onAddMessage = (e) => {
    e.preventDefault();
    props.addMessage();
  }

  let onPostChange = (e) => {
    e.preventDefault();
    let text = e.target.value;
    props.updateNewMessageText(text);
  }

  return (
    <form action="" className={classes.newMessage__form}>
      <textarea
        rows="10"
        value={newMessage}
        onChange={onPostChange}
      ></textarea>
      <button onClick={onAddMessage}>Add New Message!!</button>
    </form>
  )
}

export default NewMessage;