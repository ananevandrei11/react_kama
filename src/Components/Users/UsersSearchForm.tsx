import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { FilterType } from '../../Redux/usersReducer';

type UsersSearchFormPropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

const UsersSearchForm = React.memo(
  ({ onFilterChanged }: UsersSearchFormPropsType) => {
    const submit = (
      values: FilterType,
      {
        setSubmitting,
        resetForm,
      }: {
        setSubmitting: (isSubmitting: boolean) => void;
        resetForm: () => void;
      }
    ) => {
      onFilterChanged(values);
      resetForm();
      setSubmitting(false);
    };
    return (
      <div>
        <Formik
          initialValues={{ term: '', friend: 'null' }}
          onSubmit={submit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <Field type="text" name="term" />
              </div>
              <Field name="friend" as="select">
                <option value="all">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only onfollowed</option>
              </Field>
              <div>
                <button type="submit" disabled={isSubmitting}>
                  Find Friends
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
);

export default UsersSearchForm;
