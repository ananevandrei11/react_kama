import {
  MeResponseDataType,
  LoginResponseDataType,
  LoginDataType,
  ResponseType
} from '../Types/types';
import { instance } from './Api';

export const loginAPI = {
  me() {
    return instance
      .get<ResponseType<MeResponseDataType>>(`auth/me`)
      .then((res) => res.data);
  },

  login(data: LoginDataType) {
    return instance
      .post<ResponseType<LoginResponseDataType>>('auth/login', {
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

  logout() {
    return instance.delete('auth/login');
  },
};
