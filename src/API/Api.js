import axios from "axios"

export const getUsers = (currentPage, countPage) => {
  return axios.get(
    `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${countPage}`, {
    withCredentials: true
  })
  .then(response => {
    return response.data;
  });
};

