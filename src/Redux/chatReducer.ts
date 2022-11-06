import { BaseThunkType, InferActionsType } from './reduxStore';
import { chatApi, ChatMessageType } from '../API/chat-api';
import { Dispatch } from 'redux';
import * as UUid from 'uuid';

type StatusType = 'pending' | 'ready' | 'error';
type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
type ChatMessageWithIdType = ChatMessageType & { id: string };

let initialState = {
  messages: [] as ChatMessageWithIdType[],
  status: 'pending' as StatusType,
};

const chatReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SN/CHAT/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.map((m) => ({ ...m, id: UUid.v1() })),
        ].filter((m, i, array) => i >= array.length - 10),
      };

    case 'SN/CHAT/STATUS_CHANGED':
      return {
        ...state,
        status: action.payload,
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
  statusChanged: (status: StatusType) =>
    ({
      type: 'SN/CHAT/STATUS_CHANGED',
      payload: status,
    } as const),
};

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler !== null) {
    return _newMessagesHandler;
  }
  _newMessagesHandler = (messages: ChatMessageType[]) => {
    dispatch(actions.messagesReceived(messages));
  };
  return _newMessagesHandler;
};

let _statusChangingHandler: ((status: StatusType) => void) | null = null;
const statusChangingHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangingHandler !== null) {
    return _statusChangingHandler;
  }
  _statusChangingHandler = (status: StatusType) => {
    dispatch(actions.statusChanged(status));
  };
  return _statusChangingHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.start();
  chatApi.subscribe('message-received', newMessagesHandlerCreator(dispatch));
  chatApi.subscribe('status-changed', statusChangingHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatApi.unsubscribe('message-received', newMessagesHandlerCreator(dispatch));
  chatApi.unsubscribe('status-changed', statusChangingHandlerCreator(dispatch));
  chatApi.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatApi.sendMessage(message);
  };

export default chatReducer;
