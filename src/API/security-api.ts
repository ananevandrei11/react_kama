import { instance } from './Api';

export const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<{ url: string }>(`/security/get-captcha-url`)
      .then((res) => res.data);
  },
};
