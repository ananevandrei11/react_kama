import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  addPostThunk,
} from "../../../Redux/profileReducer";
import { AppStateType } from "../../../Redux/reduxStore";
import MyPosts from "./MyPosts";

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
};

const MyPostsContainer = compose(
  connect(mapStateToProps, {
    addPostThunk,
  })
)(MyPosts);

export default MyPostsContainer;
