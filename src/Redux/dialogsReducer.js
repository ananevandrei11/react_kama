const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
	users: [
		{ id: 1, name: 'Petr' },
		{ id: 2, name: 'Vasiliy' },
		{ id: 3, name: 'Ivan' },
		{ id: 4, name: 'Valentina' },
		{ id: 5, name: 'Alina' },
		{ id: 6, name: 'Evgeniy' },
		{ id: 7, name: 'Andrei' },
	],
	messages: [
		{ id: 1, text: 'Hi!' },
		{ id: 2, text: 'Hello!' },
		{ id: 3, text: 'How are You?' },
		{ id: 4, text: 'Adabra-Kedavra' },
		{ id: 5, text: 'Are You kidding?' },
		{ id: 6, text: 'Yes!' },
		{ id: 7, text: 'Yoooo!' },
	],
	newMessage: 'New Message',
}

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			let newMessageSubmit = {
				id: state.messages.length + 1,
				text: action.newMessage
			};
			return {
				...state,
				messages: [...state.messages, newMessageSubmit],
				newMessage: 'New Message'
			};

		default:
			return state;
	}
}

export const addMessageCreator = (text) => ({
	type: ADD_MESSAGE,
	newMessage: text,
});

export const addMessageThunk = (text) => (dispatch) => {
	dispatch(addMessageCreator(text));
}

export default dialogsReducer;