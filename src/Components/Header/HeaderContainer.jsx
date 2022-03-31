import * as axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { setAuthUserData, toggleIsAuth } from '../../Redux/authReducer';

class HeaderSubContainer extends React.Component {

  componentDidMount() {
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
    { withCredentials: true})
      .then(response => {
        if (response.data.resultCode === 0) {
          this.props.toggleIsAuth(true);
          let {id, login, email} = response.data.data;
          this.props.setAuthUserData(id, login, email);
        }
      });
  }

  render() {
    return (
      <>
       <Header {...this.props}/>
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