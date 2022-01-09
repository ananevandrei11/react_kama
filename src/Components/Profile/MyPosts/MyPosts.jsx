import React from "react";
import Post from "./Post/Post";
import classes from './MyPosts.module.css';

const MyPosts = (props) => {
  let posts = props.posts;
  let newPostText = props.newPostText;

  let content = posts.map((post) =>
    <Post key={post.id} idItem={`item-${post.id}`}
      children={
        <>
          <h3>{"Post " + post.id}</h3>
          <p>{post.message}</p>
          <i>{"Likes " + post.likesСount}</i>
        </>
      }
    />
  );

  let newPostELem = React.createRef();

  let addPost = (e) => {
    e.preventDefault();
    let action = { type: 'ADD-POST' };
    props.dispatch(action);
  }

  let onPostChange = (e) => {
    e.preventDefault();
    let text = newPostELem.current.value;
    let action = {
      type: 'UPDATE-NEW-POST-TEXT',
      newText: text,
    };
    props.dispatch(action);
  }

  return (
    <section className={classes.posts}>
      <h2 className={classes.title}>My Posts</h2>
      <form className={classes.newpost}>
        <textarea
          ref={newPostELem}
          rows="5"
          value={newPostText}
          onChange={onPostChange}
        ></textarea>
        <button onClick={addPost}>Add New Post</button>
      </form>
      {content}
    </section>
  );
}

export default MyPosts;