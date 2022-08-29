import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAuthUser } from '../Redux/authReducer';
import { AppStateType } from '../Redux/reduxStore';

let mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

export function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<WCP & MapStatePropsType> = (props) => {
    let { isAuth, ...restProps } = props;
    // @ts-ignore
    if (!isAuth) return <Redirect to="/login" />;
    // @ts-ignore
    return <WrappedComponent {...restProps as WCP} />;
  }

  let ConnectAuthRedirectComponent = connect(mapStateToProps, {
    setAuthUser,
    // @ts-ignore
  })(RedirectComponent);
  return ConnectAuthRedirectComponent;
}
