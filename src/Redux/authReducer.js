import { loginAPI } from "../API/Api";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const TOGGLE_ERROR_LOGIN = "TOGGLE_ERROR_LOGIN";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  errorLogin: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.data,
      };

    case TOGGLE_ERROR_LOGIN:
      return {
        ...state,
        errorLogin: action.errorLogin,
      };

    default:
      return state;
  }
};

export const setAuthUserData = (userId, login, email, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  data: { userId, login, email, isAuth },
});

export const setErrorLogin = (errorLogin) => ({
  type: TOGGLE_ERROR_LOGIN,
  errorLogin,
});


export const setAuthUser = () => (dispatch) => {
  return loginAPI.checkLogin().then((data) => {
    if (data.resultCode === 0) {
      let { id, login, email } = data.data;
      dispatch(setAuthUserData(id, login, email, true));
    }
    dispatch(setErrorLogin(null));
  });
};

export const authLoginThunk = (data) => {
  return (dispatch) => {
    loginAPI.authLogin(data).then((response) => {
      if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, data.email, true));
      } else {
        dispatch(setErrorLogin(response.messages));
      }
    })

    loginAPI.checkLogin().then((data) => {
      if (data.resultCode === 0) {
        let { id, login, email } = data.data;
        dispatch(setAuthUserData(id, login, email, true));
      }
    });
  };
};

export const logOutThunk = (data) => {
  return (dispatch) => {
    loginAPI.logOut().then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    })
  };
};

export default authReducer;
