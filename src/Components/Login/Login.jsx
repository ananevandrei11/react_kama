import React from "react";
import { connect } from "react-redux";
import { authLoginThunk } from "../../Redux/authReducer";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputCheckbox, InputText } from "../Common/FormControls/FormsControls";
import {
  textLengthAndRequired,
  checkboxRequired,
  emailRequired,
} from "../../Utils/Validators/Validators";
import cls from "./Login.module.css";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to="/profile"></Redirect>;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm {...props} />
    </div>
  );
};

const LoginForm = ({
  errorLogin,
  captcha,
  authLoginThunk,
}) => {

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false,
        captcha: "true",
      }}
      validationSchema={Yup.object().shape({
        password: textLengthAndRequired(20),
        email: emailRequired(),
        rememberMe: checkboxRequired("It is required True!"),
        captcha: Yup.string().required('It is required.'),
      })}
      onSubmit={async (values) => {
        await authLoginThunk(values);
      }}
    >
      {({ validateForm, isSubmitting }) => (
        <Form className={cls.form}>
          <InputText name="email" type="email" placeholder="Login" />
          <InputText name="password" type="password" placeholder="Password" />
          <InputCheckbox name="rememberMe" type="checkbox" id="rememberMe">
            Remember Me
          </InputCheckbox>
          {captcha && (
            <>
              <InputText name="captcha" type="text" placeholder="Captcha" />
              <img src={captcha} alt="captcha" />
            </>
          )}
          <div>
            <button
              type="submit"
              className={cls.button}
              onClick={() => validateForm()}
              disabled={isSubmitting}
            >
              LOG IN
            </button>
            <div className={cls.errorLogin}>
              {errorLogin ? <div>{errorLogin}</div> : null}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  errorLogin: state.auth.errorLogin,
  captcha: state.auth.captcha,
});

const LoginFormRedux = connect(mapStateToProps, {
  authLoginThunk,
})(Login);

export default LoginFormRedux;
