import axios from 'axios';
import {
  AuthLoginPostDataType,
  CheckLoginAPIType,
  LogitDataType,
  PhotoDataType,
  ProfileType,
  ResponsePostType,
} from '../Types/types';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '7f37d8b4-4bd3-4108-b530-d90e6f854b5f',
  },
});

export const profileAPI = {
  setUserIDforProfile(userID: number) {
    return instance.get(`profile/${userID}`).then((res) => res.data);
  },

  getStatus(userID: number) {
    return instance.get(`profile/status/${userID}`).then((res) => res.data);
  },

  updateStatus(status: string) {
    return instance.put<ResponsePostType>(`profile/status`, {
      status: status,
    });
  },

  savePhoto(photo: any) {
    const formData = new FormData();
    formData.append('image', photo);
    return instance.put<ResponsePostType<PhotoDataType>>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => res.data);
  },

  saveProfile(values: ProfileType) {
    return instance.put<ResponsePostType>(`profile`, values, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.data);
  },
};
