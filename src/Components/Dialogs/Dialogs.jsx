import React from "react";
import classes from './Dialogs.module.css';
import DialogMessage from "./DialogMessage/DialogsMessage";
import DialogUser from "./DialogUser/DialogsUser";
import NewMessageContainer from "./NewMessage/NewMessageContainer";
import StoreContext from "../../StoreContext";

const Dialogs = (props) => {
	return <StoreContext.Consumer>
		{
			(store) => {
				let users = store.getState().dialogPage.users;
				let messages = store.getState().dialogPage.messages;

				return (
					<div className={classes.dialogs}>
						<aside className={classes.names}>
							{users.map((user) =>
								<DialogUser key={user.id} id={user.id} name={user.name} />
							)}
						</aside>
						<section >
							{messages.map((message) =>
								<DialogMessage key={message.id} message={message.text} />
							)}
						</section>
						<section className={classes.newMessage}>
							<NewMessageContainer />
						</section>
					</div>
				);
			}
		}
	</StoreContext.Consumer>
}

export default Dialogs;