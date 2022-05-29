import React from "react";
import { connect } from "react-redux";
import {
	addMessageThunk,
  updateNewMessageTextThunk,
} from "../../../Redux/dialogsReducer";
import NewMessage from "./NewMessage";

let mapStateToProps = (state) => {
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

const NewMessageContainer = connect(mapStateToProps, {
	addMessageThunk,
  updateNewMessageTextThunk,
})(NewMessage);

export default NewMessageContainer;
