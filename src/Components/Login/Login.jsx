import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { authLoginThunk } from "../../Redux/authReducer";
import { compose } from "redux";

const Login = (props) => {
  return (
    <div>
      <h1>Login</h1>
      <LoginFormRedux />
    </div>
  );
};

const LoginForm = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (values) => {
			props.authLoginThunk(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          name="email"
          type="email"
          placeholder="Login"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>
      <div>
        <input
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          onChange={formik.handleChange}
          value={formik.values.rememberMe}
        />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>
      <div>
        <button>LOG IN</button>
      </div>
    </form>
  );
};

let mapStateToProps = (state) => {
  return {};
};

const LoginFormRedux = compose(connect(mapStateToProps, { authLoginThunk }))(
  LoginForm
);

export default Login;
