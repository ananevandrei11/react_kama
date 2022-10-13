import { profileAPI } from '../API/profile-api';
import { PhotosType, ProfileType, PostType, ResultCodeEnum } from '../Types/types';
import { BaseThunkType, InferActionsType } from './reduxStore';

type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

let initialState = {
  posts: [
    {
      id: 1,
      message: 'I`m first Post!',
      likesСount: 3,
    },
  ] as PostType[],
  profile: null as ProfileType | null,
  newPostText: 'New Post Text',
  status: '',
};

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD_POST':
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

    case 'SN/PROFILE/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postID),
      };

    case 'SN/PROFILE/SET_USER_PROFILE-NEW-POST-TEXT':
      return {
        ...state,
        profile: action.profile,
      };

    case 'SN/PROFILE/SET_STATUS':
      return {
        ...state,
        status: action.status,
      };

    case 'SN/PROFILE/SAVE_PHOTO_SUCCESS':
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

const actions = {
  addPostCreator: (text: string) => ({ type: 'SN/PROFILE/ADD_POST', newPostText: text } as const),
  deletePostCreator: (postID: number) => ({ type: 'SN/PROFILE/DELETE_POST', postID } as const),
  setUserProfile: (profile: ProfileType) => ({ type: 'SN/PROFILE/SET_USER_PROFILE-NEW-POST-TEXT', profile } as const),
  setStatusCreator: (status: string) => ({ type: 'SN/PROFILE/SET_STATUS', status } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
};


export const addPostThunk = (text: string) => {
  return (dispatch: Function) => {
    dispatch(actions.addPostCreator(text));
  };
};

export const getUserProfile = (userID: number): ThunkType => async (dispatch) => {
  let response = await profileAPI.getProfile(userID);
  dispatch(actions.setUserProfile(response));
};

export const getStatus = (userID: number): ThunkType => async (dispatch) => {
  let response = await profileAPI.getStatus(userID);
  dispatch(actions.setStatusCreator(response));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setStatusCreator(status));
  }
};

export const savePhoto = (photo: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(photo);
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
};

export const saveProfile = (values: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  let data = await profileAPI.saveProfile(values);
  if (data.resultCode === ResultCodeEnum.Success) {
    if (userId !== null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error('userId can`t be null');
    }
  }
};

export default profileReducer;