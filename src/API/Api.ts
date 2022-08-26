import axios from 'axios';
import {
  CheckLoginAPIType,
  LoginAPIType,
  LogitDataType,
  ProfileType,
} from '../Types/types';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '7f37d8b4-4bd3-4108-b530-d90e6f854b5f',
  },
});

export const userAPI = {
  getUsers(currentPage: number, countPage: number) {
    return instance
      .get(`users?page=${currentPage}&count=${countPage}`)
      .then((response) => {
        return response.data;
      });
  },

  followUser(userID: number) {
    return instance.post(`follow/${userID}`).then((response) => {
      return response.data;
    });
  },

  unfollowUser(userID: number) {
    return instance.delete(`follow/${userID}`).then((response) => {
      return response.data;
    });
  },
};

export const loginAPI = {
  checkLogin() {
    return instance.get<CheckLoginAPIType>(`auth/me`).then((response) => {
      return response.data;
    });
  },

  authLogin(data: any) {
    return instance
      .post('auth/login', {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        captcha: data.captcha,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  logOut() {
    return instance.delete('auth/login');
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`/security/get-captcha-url`).then((response) => {
      return response.data;
    });
  },
};

export const profileAPI = {
  setUserIDforProfile(userID: number) {
    return instance.get(`profile/${userID}`).then((response) => {
      return response.data;
    });
  },

  getStatus(userID: number) {
    return instance.get(`profile/status/${userID}`).then((response) => {
      return response.data;
    });
  },

  updateStatus(status: string) {
    return instance.put(`profile/status`, {
      status: status,
    });
  },

  savePhoto(photo: any) {
    const formData = new FormData();
    formData.append('image', photo);
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  saveProfile(values: ProfileType) {
    return instance.put(`profile`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
