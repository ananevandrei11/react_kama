import { setAuthUser } from './authReducer';

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

export type InitialStateType = {
	initialized: boolean;
};

let initialState: InitialStateType = {
	initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case INITIALIZED_SUCCES:
			return {
				...state,
				initialized: true,
			};

		default:
			return state;
	}
};

type InitializedSuccesActipnType = {
	type: typeof INITIALIZED_SUCCES;
};

export const setInitializedSucces = (): InitializedSuccesActipnType => ({
	type: INITIALIZED_SUCCES,
});

export const initializeApp = () => (dispatch: any) => {
	let dispathResult = dispatch(setAuthUser());
	Promise.all([dispathResult]).then(() => {
		dispatch(setInitializedSucces());
	});
};

export default appReducer;
