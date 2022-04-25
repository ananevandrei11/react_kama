import { loginAPI } from "../API/Api";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const TOGGLE_IS_AUTH = 'TOGGLE_IS_AUTH';

let initialState = {
	userId: null,
	email: null,
  login: null,
	isAuth: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.data
      }

    case TOGGLE_IS_AUTH:
      return {
        ...state,
        isAuth: action.isAuth
      };
    
    default:
      return state;
  }
};

export const setAuthUserData = (userId, login, email) => ({
	type: SET_AUTH_USER_DATA,
	data: {userId, login, email},
});

export const toggleIsAuth = (isAuth) => ({
	type: TOGGLE_IS_AUTH,
	isAuth
});

export const setAuthUser = () => {
	return (dispatch) => {
		loginAPI.checkLogin().then(data => {
      if (data.resultCode === 0) {
        dispatch(toggleIsAuth(true));
        let { id, login, email } = data.data;
        dispatch(setAuthUserData(id, login, email));
      }
    });
	}
};

export default authReducer;