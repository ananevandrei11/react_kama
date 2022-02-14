import React from "react";
import Post from "./Post/Post";
import classes from './MyPosts.module.css';
import { addPostCreator, updateNewPostTextCreator } from "../../../Redux/profileReducer";



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

  let addPost = (e) => {
    e.preventDefault();
    let action = addPostCreator();
    props.dispatch(action);
  }

  let onPostChange = (e) => {
    e.preventDefault();
    let text = e.target.value;
    let action = updateNewPostTextCreator(text);
    props.dispatch(action);
  }

  return (
    <section className={classes.posts}>
      <h2 className={classes.title}>My Posts</h2>
      <form className={classes.newpost}>
        <textarea
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