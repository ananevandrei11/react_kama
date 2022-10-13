import { GetCaptchaUrlResponseDataType } from '../Types/types';
import { instance } from './Api';

export const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<GetCaptchaUrlResponseDataType>(`/security/get-captcha-url`)
      .then((res) => res.data);
  },
};
