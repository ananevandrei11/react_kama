import React from "react";
import classes from './DialogsMessage.module.css';

const DialogMessage = (props) => {
    return (
        <div className={classes.messeges__item}>{props.message}</div>
    )
}

export default DialogMessage;