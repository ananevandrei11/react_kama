import { BaseThunkType, InferActionsType } from './reduxStore';
import { chatApi, ChatMessageType } from '../API/chat-api';
import { Dispatch } from 'redux';

type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

let initialState = {
  messages: [] as ChatMessageType[],
};

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/CHAT/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };

    default:
      return state;
  }
};

const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
  ({
    type: 'SN/CHAT/MESSAGES_RECEIVED',
    payload: messages,
  } as const),
};

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler !== null) {
    return _newMessagesHandler;
  }
  _newMessagesHandler = (messages: ChatMessageType[]) => {
    dispatch(actions.messagesReceived(messages));
  }
  return _newMessagesHandler;
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.start();
  chatApi.subscribe(newMessagesHandlerCreator(dispatch))
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.unsubscribe(newMessagesHandlerCreator(dispatch));
  chatApi.stop();
};

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatApi.sendMessage(message);
};



export default chatReducer;
