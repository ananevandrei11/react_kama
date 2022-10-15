import { GetItemsType, ResponseType } from '../Types/types';
import { instance } from './Api';

export const userAPI = {
  getUsers(currentPage: number, countPage: number, term: string = '', friend: string = 'null') {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${countPage}&term=${term}&friend=${friend !== 'null' ? friend : ''}`)
      .then(res => res.data);
  },

  follow(userID: number) {
    return instance
      .post<ResponseType>(`follow/${userID}`)
      .then(res => res.data);
  },

  unfollow(userID: number) {
    return instance
      .delete<ResponseType>(`follow/${userID}`)
      .then(res => res.data);
  },
};
