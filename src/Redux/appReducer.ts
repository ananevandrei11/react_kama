import { getAuthUserData } from './authReducer';
import { BaseThunkType, InferActionsType } from './reduxStore';

let initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

const appReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/INITIALIZED_SUCCESS':
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

const actions = {
  initializedSuccess: () => ({
    type: 'SN/APP/INITIALIZED_SUCCESS',
  } as const),
};

// @ts-ignore
export const initializeApp = (): ThunkType => (dispatch) => {
  let dispatchResult = dispatch(getAuthUserData());
  Promise.all([dispatchResult]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
