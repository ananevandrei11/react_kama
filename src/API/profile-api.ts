import { PhotoResponseDataType, ProfileType, ResponseType } from '../Types/types';
import { instance } from './Api';

export const profileAPI = {
  getProfile(userID: number) {
    return instance
      .get<ProfileType>(`profile/${userID}`)
      .then((res) => res.data);
  },

  getStatus(userID: number) {
    return instance.get<string>(`profile/status/${userID}`).then((res) => res.data);
  },

  updateStatus(status: string) {
    return instance.put<ResponseType>(`profile/status`, {
      status: status,
    }).then((res) => res.data);
  },

  savePhoto(photo: any) {
    const formData = new FormData();
    formData.append('image', photo);
    return instance
      .put<ResponseType<PhotoResponseDataType>>(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data);
  },

  saveProfile(values: ProfileType) {
    return instance
      .put<ResponseType>(`profile`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data);
  },
};
