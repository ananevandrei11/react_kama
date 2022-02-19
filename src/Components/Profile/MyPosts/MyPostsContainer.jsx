import React from "react";
import { addPostCreator, updateNewPostTextCreator } from "../../../Redux/profileReducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
  let posts = props.store.getState().profilePage.posts;
  let newPostText = props.store.getState().profilePage.newPostText;
  
  let addPost = () => {
    let action = addPostCreator();
    props.store.dispatch(action);
  }

  let onPostChange = (text) => {
    let action = updateNewPostTextCreator(text);
    props.store.dispatch(action);
  }

  return (
    <>
      <MyPosts
        posts={posts}
        newPostText={newPostText}
        addPost={addPost}
        updateNewPostText={onPostChange}
      />
    </>
  );
}

export default MyPostsContainer;