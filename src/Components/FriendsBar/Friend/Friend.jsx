import React from "react";
import classes from './Friend.module.css';

const Friend = (props) => {

    return (
        <div className={classes.friend__item}>
            <h4>{props.name}</h4>
            <figure>
                <img src={props.avatar} alt={props.name} />
            </figure>
        </div>
    );
}

export default Friend;