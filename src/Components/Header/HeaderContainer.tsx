import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logOutThunk } from '../../Redux/authReducer';
import { AppStateType } from '../../Redux/reduxStore';

const HeaderSubContainer = (
  props: MapStateToPropsType & MapDispatchToPropsType
) => {
  return (
    <>
      <Header {...props} />
    </>
  );
};

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
export type MapDispatchToPropsType = {
  logOutThunk: () => void;
};
const HeaderContainer = connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  {},
  AppStateType
>(mapStateToProps, { logOutThunk })(HeaderSubContainer);

export default HeaderContainer;
