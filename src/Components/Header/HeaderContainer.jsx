import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { logOutThunk } from "../../Redux/authReducer";

const HeaderSubContainer = (props) => {
  return (
    <>
      <Header {...props} />
    </>
  );
};

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

const HeaderContainer = connect(mapStateToProps, { logOutThunk })(
  HeaderSubContainer
);

export default HeaderContainer;
