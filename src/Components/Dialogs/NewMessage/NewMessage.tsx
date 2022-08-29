import React from 'react';
import classes from './NewMessage.module.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputText } from '../../Common/FormControls/FormsControls';
import { textLengthAndRequired } from '../../../Utils/Validators/Validators';
import { DispatchType } from '../../../Redux/dialogsReducer';

type MessagePropsType = {
  newMessage: string;
  addMessageThunk: (text: string) => (dispatch: DispatchType) => void;
};

const NewMessage = (props: MessagePropsType) => {
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
