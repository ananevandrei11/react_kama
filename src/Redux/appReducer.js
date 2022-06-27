import { setAuthUser } from "./authReducer";

const INITIALIZED_SUCCES = "INITIALIZED_SUCCES";

let initialState = {
	initialized: false,
};

const appReducer = (state = initialState, action) => {
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

export const setInitializedSucces = () => ({
	type: INITIALIZED_SUCCES
});

export const initializeApp = () => (dispatch) => {
	let dispathResult = dispatch(setAuthUser());
	Promise.all([dispathResult]).then(() => {
		dispatch(setInitializedSucces());
	});
};

export default appReducer;