import React from 'react';
import classes from './NewMessage.module.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputText } from '../../Common/FormControls/FormsControls';
import { textLengthAndRequired } from '../../../Utils/Validators/Validators';

type MessagePropsType = {
  newMessage: string;
  addMessageThunk: (text: string) => (dispatch: any) => void;
};

const NewMessage = (props: MessagePropsType) => {
  const { newMessage, addMessageThunk } = props;
  return (
    <Formik
      initialValues={{
        newMessageBody: newMessage,
      }}
      validationSchema={Yup.object().shape({
        newMessageBody: textLengthAndRequired(50),
      })}
      onSubmit={(values, { resetForm }) => {
        addMessageThunk(values.newMessageBody);
        resetForm({
          values: { newMessageBody: newMessage },
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
