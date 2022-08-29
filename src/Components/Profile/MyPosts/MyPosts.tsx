import React from "react";
import Post from "./Post/Post";
import classes from "./MyPosts.module.css";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import {textLengthAndRequired} from '../../../Utils/Validators/Validators';
import { InputText } from "../../Common/FormControls/FormsControls";
import { PostType } from "../../../Types/types";

type MyPostsPropsType = {
  posts: PostType[];
  newPostText: string;
  addPostThunk: (text: string) => void;
}

const MyPosts = (props: MyPostsPropsType) => {
  let posts = props.posts;

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
          newPostText: props.newPostText,
        }}
        validationSchema={
          Yup.object().shape({
            newPostText: textLengthAndRequired(50)
          })
        }
        onSubmit={(values, { resetForm }) => {
          props.addPostThunk(values.newPostText);
          resetForm({
            values: { newPostText: props.newPostText },
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