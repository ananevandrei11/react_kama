import { loginAPI, securityAPI } from "../API/Api";

const SET_AUTH_USER_DATA = "network/auth/SET_AUTH_USER_DATA";
const TOGGLE_ERROR_LOGIN = "network/auth/TOGGLE_ERROR_LOGIN";
const GET_CAPTCHA_URL_SUCCES = "network/auth/GET_CAPTCHA_URL_SUCCES";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  errorLogin: null,
  captcha: null,
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

    case GET_CAPTCHA_URL_SUCCES:
      return {
        ...state,
        captcha: action.payload,
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

export const getCaptchaUrlSucces = (captcha) => ({
  type: GET_CAPTCHA_URL_SUCCES,
  payload: { captcha },
});

export const setAuthUser = () => async (dispatch) => {
  let response = await loginAPI.checkLogin();

  if (response.resultCode === 0) {
    let { id, login, email } = response.data;
    dispatch(setAuthUserData(id, login, email, true));
  }
  dispatch(setErrorLogin(null));
};

export const getCaptchaUrlThunk = () => async (dispatch) => {
  let captcha = await securityAPI.getCaptchaUrl();
  dispatch(getCaptchaUrlSucces(captcha.url));
};

export const authLoginThunk = (data) => async (dispatch) => {
  let login = await loginAPI.authLogin(data);
  if (login.resultCode === 0) {
    dispatch(setAuthUserData(login.data.userId, null, data.email, true));

    let loginCheck = await loginAPI.checkLogin();
    if (loginCheck.resultCode === 0) {
      let { id, login, email } = loginCheck.data;
      dispatch(setAuthUserData(id, login, email, true));
    }
  } else {
    if (login.resultCode === 10) {
      dispatch(getCaptchaUrlThunk());
    }
    dispatch(setErrorLogin(login.messages));
  }
};

export const logOutThunk = (data) => async (dispatch) => {
  let logout = await loginAPI.logOut();
  if (logout.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
