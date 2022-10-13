import { UsersMessagesType, MessagesType } from '../Types/types';
import { BaseThunkType, InferActionsType } from './reduxStore';

let initialState = {
  users: [
    { id: 1, name: 'Petr' },
    { id: 2, name: 'Vasiliy' }
  ] as UsersMessagesType[],
  messages: [
    { id: 1, text: 'Hi!' },
    { id: 2, text: 'Hello!' },
  ] as MessagesType[],
  newMessage: 'New Message' as string,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

const dialogsReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SN/DIALOGS/ADD_MESSAGE':
      let newMessageSubmit: MessagesType = {
        id: state.messages.length + 1,
        text: action.newMessage,
      };
      return {
        ...state,
        messages: [...state.messages, newMessageSubmit],
        newMessage: 'New Message',
      };

    default:
      return state;
  }
};

const actions = {
  addMessageActionCreator: (text: string) => ({
    type: 'SN/DIALOGS/ADD_MESSAGE',
    newMessage: text,
  } as const),
}

// @ts-ignore
export const addMessageThunk = (text: string): ThunkType => (dispatch) => {
  dispatch(actions.addMessageActionCreator(text));
};

export default dialogsReducer;
