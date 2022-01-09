import React from "react";
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <article className={classes.item} id={props.idItem}>
            {props.children}
        </article>
    );
}

export default Post;