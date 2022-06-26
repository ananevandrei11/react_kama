import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setAuthUser, logOutThunk } from "../../Redux/authReducer";
import { compose } from "redux";

class HeaderSubContainer extends React.Component {
  componentDidMount() {
    this.props.setAuthUser();
  }

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
    login: state.auth.login
  };
};

const HeaderContainer = compose(connect(mapStateToProps, { setAuthUser, logOutThunk }))(
  HeaderSubContainer
);

export default HeaderContainer;
