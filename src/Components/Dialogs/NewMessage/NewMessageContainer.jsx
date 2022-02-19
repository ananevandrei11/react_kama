import React from "react";
import { addMessageCreator, updateNewMessageTextCreator } from "../../../Redux/dialogsReducer";
import NewMessage from "./NewMessage";

const NewMessageContainer = (props) => {
	let newMessage = props.store.getState().dialogPage.newMessage;

	let addMessage = () => {
		let action = addMessageCreator();
		props.store.dispatch(action);
	}

	let updateNewMessageText = (text) => {
		let action = updateNewMessageTextCreator(text);
		props.store.dispatch(action);
	}
	
	return (
		<>
			<NewMessage
				newMessage={newMessage}
				addMessage={addMessage}
				updateNewMessageText={updateNewMessageText}
			/>
		</>
	)
}

export default NewMessageContainer;