import React from "react";
import { addMessageCreator, updateNewMessageTextCreator } from "../../../Redux/dialogsReducer";
import StoreContext from "../../../StoreContext";
import NewMessage from "./NewMessage";

const NewMessageContainer = (props) => {
	return <StoreContext.Consumer>
		{
			(store) => {
				let newMessage = store.getState().dialogPage.newMessage;

				let addMessage = () => {
					let action = addMessageCreator();
					store.dispatch(action);
				}

				let updateNewMessageText = (text) => {
					let action = updateNewMessageTextCreator(text);
					store.dispatch(action);
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
		}
	</StoreContext.Consumer>
}

export default NewMessageContainer;