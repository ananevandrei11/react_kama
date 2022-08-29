import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  addMessageThunk,
} from "../../../Redux/dialogsReducer";
import NewMessage from "./NewMessage";
import { AppStateType } from '../../../Redux/reduxStore';

let mapStateToProps = (state: AppStateType) => {
  return {
    newMessage: state.dialogPage.newMessage,
  };
};

/*
let mapDispatchToProps = (dispatch) => {
  return {
    addMessage: () => {
    	let action = addMessageCreator();
    	dispatch(action);
    },
    updateNewMessageText: (text) => {
    	let action = updateNewMessageTextCreator(text);
    	dispatch(action);
    }
  };
};
*/

const NewMessageContainer = compose(
  connect(mapStateToProps, {
    addMessageThunk,
  })
)(NewMessage);

export default NewMessageContainer;
