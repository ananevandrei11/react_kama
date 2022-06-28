import {
  profileAPI
} from "../API/Api";

const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE-NEW-POST-TEXT";
const SET_STATUS = "SET_STATUS";

let initialState = {
  posts: [{
    id: 1,
    message: "I`m first Post!",
    likesСount: 3,
  }, {
    id: 2,
    message: "I`m second Post!",
    likesСount: 12,
  }, {
    id: 3,
    message: "I`m third Post!",
    likesСount: 0,
  }, {
    id: 4,
    message: "I`m fourth Post!",
    likesСount: 2,
  },],
  profile: null,
  newPostText: "New Post Text",
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: state.posts.length + 1,
        message: action.newPostText,
        likesСount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "New Post Text",
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postID),
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    default:
      return state;
  }
};

export const addPostCreator = (text) => ({
  type: ADD_POST,
  newPostText: text,
});

export const addPostThunk = (text) => {
  return (dispatch) => {
    dispatch(addPostCreator(text));
  };
};

export const deletePostCreator = (postID) => ({
  type: DELETE_POST,
  postID,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setStatusCreator = (status) => ({
  type: SET_STATUS,
  status,
});

export const setUserProfileByID = (userID) => {
  return (dispatch) => {
    profileAPI.setUserIDforProfile(userID).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};

export const setStatusThunk = (userID) => {
  return (dispatch) => {
    profileAPI.getStatus(userID).then((data) => {
      dispatch(setStatusCreator(data));
    });
  };
};

export const updateStatusThunk = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setStatusCreator(status));
      }
    });
  };
};

export default profileReducer;