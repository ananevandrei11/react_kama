import { loginAPI, securityAPI } from '../API/Api';

const SET_AUTH_USER_DATA = 'network/auth/SET_AUTH_USER_DATA';
const TOGGLE_ERROR_LOGIN = 'network/auth/TOGGLE_ERROR_LOGIN';
const GET_CAPTCHA_URL_SUCCES = 'network/auth/GET_CAPTCHA_URL_SUCCES';

export type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  errorLogin: string | null;
  captcha: string | null;
};

let initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  errorLogin: null,
  captcha: null,
};

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.payload,
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

type SetAuthUserDataPayloadType = {
  userId: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
};

type SetAuthUserDataType = {
  type: typeof SET_AUTH_USER_DATA;
  payload: SetAuthUserDataPayloadType;
};

export const setAuthUserData = (
  userId: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean
): SetAuthUserDataType => ({
  type: SET_AUTH_USER_DATA,
  payload: { userId, login, email, isAuth },
});

type SetErrorLoginType = {
  type: typeof TOGGLE_ERROR_LOGIN;
  errorLogin: string | null;
};

export const setErrorLogin = (
  errorLogin: string | null
): SetErrorLoginType => ({
  type: TOGGLE_ERROR_LOGIN,
  errorLogin,
});

type GetCaptchaUrlSuccesType = {
  type: typeof GET_CAPTCHA_URL_SUCCES;
  payload: {
    captcha: string;
  };
};

export const getCaptchaUrlSucces = (
  captcha: string
): GetCaptchaUrlSuccesType => ({
  type: GET_CAPTCHA_URL_SUCCES,
  payload: { captcha },
});

export const setAuthUser = () => async (dispatch: Function) => {
  let response = await loginAPI.checkLogin();

  if (response.resultCode === 0) {
    let { id, login, email } = response.data;
    dispatch(setAuthUserData(id, login, email, true));
  }
  dispatch(setErrorLogin(null));
};

export const getCaptchaUrlThunk = () => async (dispatch: Function) => {
  let captcha = await securityAPI.getCaptchaUrl();
  dispatch(getCaptchaUrlSucces(captcha.url));
};

export const authLoginThunk =
  (data: SetAuthUserDataPayloadType) => async (dispatch: Function) => {
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

export const logOutThunk = () => async (dispatch: Function) => {
  let logout = await loginAPI.logOut();
  if (logout.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
