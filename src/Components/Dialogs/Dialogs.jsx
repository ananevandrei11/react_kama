import React from "react";
import classes from './Dialogs.module.css';
import DialogMessage from "./DialogMessage/DialogsMessage";
import DialogUser from "./DialogUser/DialogsUser";
import NewMessageContainer from "./NewMessage/NewMessageContainer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AuthRedirect } from "../../HOC/AuthRedirect";

const Dialogs = (props) => {
	if (!props.isAuth) {
		return <Redirect to={'/login'}/>;
	}
	
	return (
		<div className={classes.dialogs}>
			<aside className={classes.names}>
				{props.users.map((user) =>
					<DialogUser key={user.id} id={user.id} name={user.name} />
				)}
			</aside>
			<section >
				{props.messages.map((message) =>
					<DialogMessage key={message.id} message={message.text} />
				)}
			</section>
			<section className={classes.newMessage}>
				<NewMessageContainer />
			</section>
		</div>
	);
}

let AuthRedirectComponent = AuthRedirect(Dialogs);

let mapStateToProps = (state) => {
	return {
		users: state.dialogPage.users,
		messages: state.dialogPage.messages,
	}
}

const DialogsContainer = connect(mapStateToProps)(AuthRedirectComponent);

export default DialogsContainer;