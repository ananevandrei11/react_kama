const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

const dialogsReducer = (state, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: state.messages.length + 1,
                text: state.newMessage
            };
            state.messages.push(newMessage);
            state.newMessage = 'New Message';
            return state;

        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessage = action.newMessage;
            return state;

        default:
            return state;
    }
}

export const addMessageCreator = () => ({
    type: ADD_MESSAGE
});
export const updateNewMessageTextCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newMessage: text,
});

export default dialogsReducer;