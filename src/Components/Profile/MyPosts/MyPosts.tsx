import React from "react";
import Post from "./Post/Post";
import classes from "./MyPosts.module.css";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import {textLengthAndRequired} from '../../../Utils/Validators/Validators';
import { InputText } from "../../Common/FormControls/FormsControls";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../Redux/reduxStore";
import { addPostThunk } from "../../../Redux/profileReducer";

type MyPostsPropsType = {}

const MyPosts = (props: MyPostsPropsType) => {
  let posts = useSelector((state: AppStateType) => state.profilePage.posts);
  let newPostText = useSelector((state: AppStateType) => state.profilePage.newPostText);
  let dispatch = useDispatch();

  let content = posts.map((post) => (
    <Post
      key={post.id}
      id={`item-${post.id}`}
      children={
        <>
          <h3>{"Post " + post.id}</h3>
          <p>{post.message}</p>
          <i>{"Likes " + post.likesСount}</i>
        </>
      }
    />
  ));

  return (
    <section className={classes.posts}>
      <h2 className={classes.title}>My Posts</h2>
      <Formik
        initialValues={{
          newPostText: newPostText,
        }}
        validationSchema={
          Yup.object().shape({
            newPostText: textLengthAndRequired(50)
          })
        }
        onSubmit={(values, { resetForm }) => {
          dispatch(addPostThunk(values.newPostText));
          resetForm({
            values: { newPostText: newPostText },
          });
        }}
      >
        <Form className={classes.newpost}>
          <InputText 
            rows="5"
            name="newPostText"
            as="textarea"
          />
          <button>Add New Post</button>
        </Form>
      </Formik>
      {content}
    </section>
  );
};

export default MyPosts;