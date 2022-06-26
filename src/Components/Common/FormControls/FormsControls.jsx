import { Field, useField } from "formik";
import React from "react";
import cls from "./FromControls.module.css";

export const InputText = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div
      className={[
        cls.inputField,
        meta.touched && meta.error ? cls.error : "",
      ].join(" ")}
    >
      <Field className={cls.inputText} {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className={cls.errorText}>{meta.error}</span>
      ) : null}
    </div>
  );
};

export const InputCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <label
      htmlFor={props.name}
      className={[
        cls.labelField,
        meta.touched && meta.error ? cls.error : "",
      ].join(" ")}
    >
      <Field className={cls.checkbox} {...field} {...props} />
      <span className={cls.checkboxLabel}>{children}</span>
      {meta.touched && meta.error ? (
        <span className={cls.errorCheckbox}>{meta.error}</span>
      ) : null}
    </label>
  );
};
