import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAuthUser } from "../Redux/authReducer";

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    componentDidMount() {
      this.props.setAuthUser();
    }

    render() {
      if (!this.props.isAuth) {
        return <Redirect to="/login" />;
      }
      return <Component {...this.props} />;
    }
  }

  let ConnectAuthRedirectComponent = connect(mapStateToProps, {
    setAuthUser,
  })(RedirectComponent);
  return ConnectAuthRedirectComponent;
};
