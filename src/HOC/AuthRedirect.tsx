import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getAuthUserData } from '../Redux/authReducer';
import { AppStateType } from '../Redux/reduxStore';

let mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapStatePropsType = ReturnType<typeof mapStateToPropsForRedirect>;

export function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<WCP & MapStatePropsType> = (props) => {
    let { isAuth, ...restProps } = props;
    // @ts-ignore
    if (!isAuth) return <Redirect to="/login" />;
    // @ts-ignore
    return <WrappedComponent {...(restProps as WCP)} />;
  };

  let ConnectAuthRedirectComponent = connect<
    MapStatePropsType,
    {},
    WCP,
    AppStateType
  >(mapStateToPropsForRedirect, {
    getAuthUserData,
    // @ts-ignore
  })(RedirectComponent);
  return ConnectAuthRedirectComponent;
}
