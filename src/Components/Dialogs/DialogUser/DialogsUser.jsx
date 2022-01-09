import React from "react";
import classes from './DialogsUser.module.css';
import {
    NavLink
} from "react-router-dom";

const DialogUser = (props) => {
    let path = "/dialogs/id=" + props.id + "&name=" + props.name;
    return (
        <div className={classes.names__items}>
            <NavLink
                activeClassName={classes.names__itemsActive}
                to={path}
            >
                {props.name}
            </NavLink>
        </div>
    )
}

export default DialogUser;