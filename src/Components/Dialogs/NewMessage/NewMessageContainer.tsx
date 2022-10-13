import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addMessageThunk } from '../../../Redux/dialogsReducer';
import NewMessage from './NewMessage';
import { AppStateType } from '../../../Redux/reduxStore';

let mapStateToProps = (state: AppStateType) => {
  return {
    newMessage: state.dialogPage.newMessage,
  };
};

const NewMessageContainer = compose<React.ComponentType>(
  connect(mapStateToProps, {
    addMessageThunk,
  })
)(NewMessage);

export default NewMessageContainer;
