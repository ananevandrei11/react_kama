import { LogitDataType, ResultCodeEnum } from '../Types/types';
import { loginAPI } from '../API/auth-api';
import { securityAPI } from '../API/security-api';
import { BaseThunkType, InferActionsType } from './reduxStore';

const SET_AUTH_USER_DATA = 'SN/AUTH/SET_AUTH_USER_DATA';
const TOGGLE_ERROR_LOGIN = 'SN/AUTH/TOGGLE_ERROR_LOGIN';
const GET_CAPTCHA_URL_SUCCES = 'SN/AUTH/GET_CAPTCHA_URL_SUCCES';

export type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  errorLogin: string | null;
  captcha: string | null;
};
type ActionsType = InferActionsType<typeof actions>;
type ThunkActionType = BaseThunkType<ActionsType>;

let initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  errorLogin: null,
  captcha: null,
};

const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
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
        captcha: action.payload.captcha,
      };

    default:
      return state;
  }
};

const actions = {
  setAuthUserData: (
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
  ) =>
    ({
      type: SET_AUTH_USER_DATA,
      payload: { userId, login, email, isAuth },
    } as const),

  setErrorLogin: (errorLogin: string | null) =>
    ({
      type: TOGGLE_ERROR_LOGIN,
      errorLogin,
    } as const),

  getCaptchaUrlSucces: (captcha: string | null) =>
    ({
      type: GET_CAPTCHA_URL_SUCCES,
      payload: { captcha },
    } as const),
};

export const setAuthUser =
  (): ThunkActionType => async (dispatch) => {
    let response = await loginAPI.checkLogin();
    if (response.resultCode === ResultCodeEnum.Success) {
      let { id, login, email } = response.data;
      dispatch(actions.setAuthUserData(id, login, email, true));
    }
    dispatch(actions.setErrorLogin(null));
  };

export const getCaptchaUrlThunk =
  (): ThunkActionType => async (dispatch) => {
    let captcha = await securityAPI.getCaptchaUrl();
    dispatch(actions.getCaptchaUrlSucces(captcha.url));
  };

export const authLoginThunk =
  (data: LogitDataType): ThunkActionType =>
  async (dispatch: Function) => {
    let response = (await loginAPI.authLogin(data)) as any;

    if (response.resultCode === 0) {
      dispatch(
        actions.setAuthUserData(response.data.userId, null, data.email, true)
      );

      let loginCheck = await loginAPI.checkLogin();
      if (loginCheck.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = loginCheck.data;
        dispatch(actions.setAuthUserData(id, login, email, true));
      }
    } else {
      if (response.resultCode === ResultCodeEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrlThunk());
      }
      dispatch(actions.setErrorLogin(response.messages));
    }
  };

export const logOutThunk =
  (): ThunkActionType => async (dispatch) => {
    let logout = await loginAPI.logOut();
    if (logout.data.resultCode === 0) {
      dispatch(actions.setAuthUserData(null, null, null, false));
    }
  };

export default authReducer;
