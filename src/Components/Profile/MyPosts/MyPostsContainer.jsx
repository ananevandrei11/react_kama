import React from "react";
import { addPostCreator, updateNewPostTextCreator } from "../../../Redux/profileReducer";
import StoreContext from "../../../StoreContext";
import MyPosts from "./MyPosts";

const MyPostsContainer = () => {
  return <StoreContext.Consumer>
    {
      (store) => {
        let addPost = () => {
          let action = addPostCreator();
          store.dispatch(action);
        }

        let onPostChange = (text) => {
          let action = updateNewPostTextCreator(text);
          store.dispatch(action);
        }

        return (
          <MyPosts
            posts={store.getState().profilePage.posts}
            newPostText={store.getState().profilePage.newPostText}
            addPost={addPost}
            updateNewPostText={onPostChange}
          />
        )
      }
    }
  </StoreContext.Consumer>
}

export default MyPostsContainer;