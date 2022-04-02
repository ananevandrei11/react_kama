import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setAuthUserData, toggleIsAuth } from '../../Redux/authReducer';
import { loginAPI } from "../../API/Api";

class HeaderSubContainer extends React.Component {

  componentDidMount() {
    loginAPI.checkLogin().then(data => {
      if (data.resultCode === 0) {
        this.props.toggleIsAuth(true);
        let { id, login, email } = data.data;
        this.props.setAuthUserData(id, login, email);
      }
    });
  }

  render() {
    return (
      <>
        <Header {...this.props} />
      </>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  }
};

const HeaderContainer = connect(mapStateToProps, { setAuthUserData, toggleIsAuth })(HeaderSubContainer);

export default HeaderContainer;