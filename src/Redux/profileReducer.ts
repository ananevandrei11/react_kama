import { profileAPI } from '../API/Api';
import { PhotosType, ProfileType } from '../Types/types';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE-NEW-POST-TEXT';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES';

type PostType = {
  id: number;
  message: string;
  likesСount: number;
};

type InitialStateType = {
  posts: PostType[];
  profile: null | ProfileType;
  newPostText: string;
  status: string;
};

let initialState: InitialStateType = {
  posts: [
    {
      id: 1,
      message: 'I`m first Post!',
      likesСount: 3,
    },
    {
      id: 2,
      message: 'I`m second Post!',
      likesСount: 12,
    },
    {
      id: 3,
      message: 'I`m third Post!',
      likesСount: 0,
    },
    {
      id: 4,
      message: 'I`m fourth Post!',
      likesСount: 2,
    },
  ],
  profile: null,
  newPostText: 'New Post Text',
  status: '',
};

const profileReducer = (state = initialState, action: any) => {
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
        newPostText: 'New Post Text',
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postID),
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

    case SAVE_PHOTO_SUCCES:
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        },
      };

    default:
      return state;
  }
};

type AddPostCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};

export const addPostCreator = (text: string): AddPostCreatorType => ({
  type: ADD_POST,
  newPostText: text,
});

export const addPostThunk = (text: string) => {
  return (dispatch: Function) => {
    dispatch(addPostCreator(text));
  };
};

type DeletePostCreatorType = {
  type: typeof DELETE_POST;
  postID: number;
};

export const deletePostCreator = (postID: number): DeletePostCreatorType => ({
  type: DELETE_POST,
  postID,
});

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetStatusCreatorType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setStatusCreator = (status: string): SetStatusCreatorType => ({
  type: SET_STATUS,
  status,
});

type SavePhotoSuccesType = {
  type: typeof SAVE_PHOTO_SUCCES;
  photos: PhotosType;
};

export const savePhotoSucces = (photos: PhotosType): SavePhotoSuccesType => ({
  type: SAVE_PHOTO_SUCCES,
  photos,
});

export const setUserProfileByID =
  (userID: number) => async (dispatch: Function) => {
    let response = await profileAPI.setUserIDforProfile(userID);
    dispatch(setUserProfile(response));
  };

export const setStatusThunk =
  (userID: number) => async (dispatch: Function) => {
    let response = await profileAPI.getStatus(userID);
    dispatch(setStatusCreator(response));
  };

export const updateStatusThunk =
  (status: string) => async (dispatch: Function) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatusCreator(status));
    }
  };

export const savePhotoTHunk = (photo: any) => async (dispatch: Function) => {
  let response = await profileAPI.savePhoto(photo);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSucces(response.data.data.photos));
  }
};

export const saveProfileThunk = (values: any) => async (dispatch: Function, getState: Function) => {
  const userId = getState().auth.userId;

  let response = await profileAPI.saveProfile(values);
  if (response.data.resultCode === 0) {
    dispatch(setUserProfileByID(userId));
  }
};

export default profileReducer;
