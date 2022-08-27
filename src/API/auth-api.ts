import {
  AuthLoginPostDataType,
  CheckLoginAPIType,
  LogitDataType,
  ResponsePostType,
} from '../Types/types';
import { instance } from './Api';

export const loginAPI = {
  checkLogin() {
    return instance
      .get<ResponsePostType<CheckLoginAPIType>>(`auth/me`)
      .then((res) => res.data);
  },

  authLogin(data: LogitDataType) {
    return instance
      .post<ResponsePostType<AuthLoginPostDataType>>('auth/login', {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        captcha: data.captcha,
      })
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  },

  logOut() {
    return instance.delete('auth/login');
  },
};
