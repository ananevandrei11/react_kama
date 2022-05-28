import React from "react";
import { connect } from "react-redux";
import {
  addPostThunk,
  updateNewPostTextThunk,
} from "../../../Redux/profileReducer";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

const MyPostsContainer = connect(mapStateToProps, {
  addPostThunk,
  updateNewPostTextThunk
})(MyPosts);

export default MyPostsContainer;
