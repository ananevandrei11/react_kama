import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setAuthUser, logOutThunk } from "../../Redux/authReducer";
import { compose } from "redux";

class HeaderSubContainer extends React.Component {
  render() {
    return (
      <>
        <Header {...this.props} />
      </>
    );
  }
}

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
