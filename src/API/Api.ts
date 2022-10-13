import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '7f37d8b4-4bd3-4108-b530-d90e6f854b5f',
  },
});
