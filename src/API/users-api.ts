import { ResponsePostType } from '../Types/types';
import { instance } from './Api';

export const userAPI = {
  getUsers(currentPage: number, countPage: number) {
    return instance
      .get(`users?page=${currentPage}&count=${countPage}`)
      .then((res) => res.data);
  },

  followUser(userID: number) {
    return instance
      .post<ResponsePostType>(`follow/${userID}`)
      .then((res) => res.data);
  },

  unfollowUser(userID: number) {
    return instance
      .delete<ResponsePostType>(`follow/${userID}`)
      .then((res) => res.data);
  },
};
