import { LoginDataType, ResultCodeEnum } from '../Types/types';
import { loginAPI } from '../API/auth-api';
import { securityAPI } from '../API/security-api';
import { BaseThunkType, InferActionsType } from './reduxStore';

export type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  errorLogin: string | null;
  captcha: string | null;
};
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

let initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  errorLogin: null,
  captcha: null,
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/AUTH/SET_AUTH_USER_DATA':
      return {
        ...state,
        ...action.payload,
      };

    case 'SN/AUTH/TOGGLE_ERROR_LOGIN':
      return {
        ...state,
        errorLogin: action.errorLogin,
      };

    case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        captcha: action.payload.captcha,
      };

    default:
      return state;
  }
};

const actions = {
  setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) =>
  ({
    type: 'SN/AUTH/SET_AUTH_USER_DATA',
    payload: { userId, login, email, isAuth },
  } as const),

  setErrorLogin: (errorLogin: string | null) =>
  ({
    type: 'SN/AUTH/TOGGLE_ERROR_LOGIN',
    errorLogin,
  } as const),

  getCaptchaUrlSuccess: (captcha: string | null) =>
  ({
    type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS',
    payload: { captcha },
  } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let response = await loginAPI.me();
  if (response.resultCode === ResultCodeEnum.Success) {
    let { id, login, email } = response.data;
    dispatch(actions.setAuthUserData(id, login, email, true));
  }
  dispatch(actions.setErrorLogin(null));
};

export const getCaptchaUrlThunk = (): ThunkType => async (dispatch) => {
  let captcha = await securityAPI.getCaptchaUrl();
  dispatch(actions.getCaptchaUrlSuccess(captcha.url));
};

export const loginThunk = (data: LoginDataType): ThunkType => async (dispatch: Function) => {
  let response = (await loginAPI.login(data)) as any;

  if (response.resultCode === 0) {
    dispatch(
      actions.setAuthUserData(response.data.userId, null, data.email, true)
    );

    let loginCheck = await loginAPI.me();
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

export const logOutThunk = (): ThunkType => async (dispatch) => {
  let logout = await loginAPI.logout();
  if (logout.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
