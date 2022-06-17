import React from "react";
import classes from "./NewMessage.module.css";
import { useFormik } from "formik";

const NewMessage = (props) => {

  let formik = useFormik({
    initialValues: {
      newMessageBody: props.newMessage,
    },
    onSubmit: (values) => {
      props.addMessageThunk(values.newMessageBody);
      formik.resetForm({
        values: { newMessageBody: props.newMessage },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.newMessage__form}>
      <textarea
        rows="10"
        onChange={formik.handleChange}
        value={formik.values.newMessageBody}
        name="newMessageBody"
      ></textarea>
      <button>Add New Message!!!</button>
    </form>
  );
};

export default NewMessage;
