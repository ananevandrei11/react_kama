import { setAuthUser } from './authReducer';
import { InferActionsType } from './reduxStore';

let initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

export const actions = {
  setInitializedSuccess: () => ({
    type: 'SN/APP/INITIALIZED_SUCCESS'
  } as const),
};

export const initializeApp = () => (dispatch: any) => {
  let dispatchResult = dispatch(setAuthUser());
  Promise.all([dispatchResult]).then(() => {
    dispatch(actions.setInitializedSuccess());
  });
};

export default appReducer;
