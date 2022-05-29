import React from "react";
import classes from './Dialogs.module.css';
import DialogMessage from "./DialogMessage/DialogsMessage";
import DialogUser from "./DialogUser/DialogsUser";
import NewMessageContainer from "./NewMessage/NewMessageContainer";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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

let mapStateToProps = (state) => {
	return {
		users: state.dialogPage.users,
		messages: state.dialogPage.messages,
		isAuth: state.auth.isAuth
	}
}

const DialogsContainer = connect(mapStateToProps)(Dialogs);

export default DialogsContainer;