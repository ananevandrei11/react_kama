import React from "react";
import Post from "./Post/Post";
import classes from "./MyPosts.module.css";
import { useFormik } from "formik";

const MyPosts = (props) => {
  let posts = props.posts;

  let content = posts.map((post) => (
    <Post
      key={post.id}
      idItem={`item-${post.id}`}
      children={
        <>
          <h3>{"Post " + post.id}</h3>
          <p>{post.message}</p>
          <i>{"Likes " + post.likesСount}</i>
        </>
      }
    />
  ));

  let formik = useFormik({
    initialValues: {
      newPostText: props.newPostText,
    },
    onSubmit: (values) => {
      props.addPostThunk(values.newPostText);
      formik.resetForm({
        values: { newPostText: props.newPostText },
      });
    },
  });

  return (
    <section className={classes.posts}>
      <h2 className={classes.title}>My Posts</h2>
      <form onSubmit={formik.handleSubmit} className={classes.newpost}>
        <textarea
          rows="5"
          value={formik.values.newPostText}
          onChange={formik.handleChange}
          name="newPostText"
        ></textarea>
        <button>Add New Post</button>
      </form>
      {content}
    </section>
  );
};

export default MyPosts;
