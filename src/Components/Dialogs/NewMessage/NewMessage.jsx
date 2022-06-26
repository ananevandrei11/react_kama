import React from "react";
import classes from "./NewMessage.module.css";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { InputText } from "../../Common/FormControls/FormsControls";
import { textLengthAndRequired } from "../../../Utils/Validators/Validators";

const NewMessage = (props) => {
  return (
    <Formik
      initialValues={{
        newMessageBody: props.newMessage,
      }}
      validationSchema={Yup.object().shape({
        newMessageBody: textLengthAndRequired(50),
      })}
      onSubmit={(values, { resetForm }) => {
        props.addMessageThunk(values.newMessageBody);
        resetForm({
          values: { newMessageBody: props.newMessage },
        });
      }}
    >
      <Form className={classes.newMessage__form}>
        <InputText rows="5" name="newMessageBody" as="textarea" />
        <button>Add New Message!!!</button>
      </Form>
    </Formik>
  );
};

export default NewMessage;
