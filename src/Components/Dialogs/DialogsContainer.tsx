import React from 'react';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/AuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/reduxStore';
import Dialogs from './Dialogs';

let mapStateToProps = (state: AppStateType) => {
  return {
    users: state.dialogPage.users,
    messages: state.dialogPage.messages,
  };
};

const DialogsContainer = compose<React.ComponentType>(
  connect(mapStateToProps),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;
