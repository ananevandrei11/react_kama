import React, { ReactNode } from 'react';
import classes from './Post.module.css';

type PostPropType = {
  id: string;
  children: ReactNode;
};

const Post = (props: PostPropType) => {
  return (
    <article className={classes.item} id={props.id}>
      {props.children}
    </article>
  );
};

export default Post;
