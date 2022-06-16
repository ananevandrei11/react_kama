import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "96914468-f3c9-4750-953f-cad879143c90",
  },
});

export const userAPI = {
  getUsers(currentPage, countPage) {
    return instance
      .get(`users?page=${currentPage}&count=${countPage}`)
      .then((response) => {
        return response.data;
      });
  },

  followUser(userID) {
    return instance.post(`follow/${userID}`).then((response) => {
      return response.data;
    });
  },

  unfollowUser(userID) {
    return instance.delete(`follow/${userID}`).then((response) => {
      return response.data;
    });
  },
};

export const loginAPI = {
  checkLogin() {
    return instance.get(`auth/me`).then((response) => {
      return response.data;
    });
  },

  authLogin(data) {
    return axios({
      method: "post",
      url: "https://social-network.samuraijs.com/api/1.0/auth/login",
      withCredentials: true,
      headers: {
        "API-KEY": "96914468-f3c9-4750-953f-cad879143c90",
      },
      data: {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export const profileAPI = {
  setUserIDforProfile(userID) {
    return instance.get(`profile/${userID}`).then((response) => {
      return response.data;
    });
  },

  getStatus(userID) {
    return instance.get(`profile/status/${userID}`).then((response) => {
      return response.data;
    });
  },

  updateStatus(status) {
    return instance.put(`profile/status`, {
      status: status,
    });
  },
};
