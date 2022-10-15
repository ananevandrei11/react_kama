import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../Redux/authReducer';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputCheckbox, InputText } from '../Common/FormControls/FormsControls';
import {
  textLengthAndRequired,
  checkboxRequired,
  emailRequired,
} from '../../Utils/Validators/Validators';
import cls from './Login.module.css';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../Redux/reduxStore';
import { LoginDataType } from '../../Types/types';

type LoginFormType = {
  errorLogin: string | null;
  captcha: string | null;
}

const LoginForm = ({ errorLogin, captcha } : LoginFormType) => {
  const dispatch = useDispatch();
  const loginThunkSubmit = (values: LoginDataType) => {
    dispatch(loginThunk(values));
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberMe: false,
        captcha: 'true',
      }}
      validationSchema={Yup.object().shape({
        password: textLengthAndRequired(20),
        email: emailRequired(),
        rememberMe: checkboxRequired('It is required True!'),
        captcha: Yup.string().required('It is required.'),
      })}
      onSubmit={async (values) => {
        await loginThunkSubmit(values);
      }}
    >
      {({ validateForm, isSubmitting }) => (
        <Form className={cls.form}>
          <InputText name="email" type="email" placeholder="Login" />
          <InputText name="password" type="password" placeholder="Password" />
          {/* @ts-ignore */}
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

const Login = () => {
  
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const errorLogin = useSelector((state: AppStateType) => state.auth.errorLogin);
  const captcha = useSelector((state: AppStateType) => state.auth.captcha);
  console.log(isAuth)
  if (isAuth) {
    // @ts-ignore
    return <Redirect to="/profile"></Redirect>;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm errorLogin={errorLogin} captcha={captcha} />
    </div>
  );
};

export default Login;
