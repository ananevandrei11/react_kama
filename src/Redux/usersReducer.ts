import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { userAPI } from '../API/Api';
import { UsersType } from '../Types/types';
import { updateObjectInArray } from '../Utils/Helpers/objectHelpers';
import { AppStateType } from './reduxStore';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [] as UsersType[],
  pageSize: 10 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: true as boolean,
  isFollowingInProgress: [] as number[],
};

type InitialStateType = typeof initialState;

type ActionsType =
  | FollowType
  | UnFollowType
  | SetUsersType
  | SetCurrentPageType
  | SetTotalUsersCountType
  | ToggleIsFetchingType
  | ToggleIsFollowingProgressType;

const usersReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', {
          followed: true,
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', {
          followed: false,
        }),
      };

    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        isFollowingInProgress: action.isFetching
          ? [...state.isFollowingInProgress, action.userID]
          : state.isFollowingInProgress.filter((id) => id !== action.userID),
      };

    default:
      return state;
  }
};

type FollowType = {
  type: typeof FOLLOW;
  userID: number;
};

export const follow = (userID: number): FollowType => ({
  type: FOLLOW,
  userID,
});

type UnFollowType = {
  type: typeof UNFOLLOW;
  userID: number;
};

export const unFollow = (userID: number): UnFollowType => ({
  type: UNFOLLOW,
  userID,
});

type SetUsersType = {
  type: typeof SET_USERS;
  users: UsersType[];
};

export const setUsers = (users: UsersType[]): SetUsersType => ({
  type: SET_USERS,
  users,
});

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  totalUsersCount: number;
};

export const setTotalUsersCount = (
  totalUsersCount: number
): SetTotalUsersCountType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});

type ToggleIsFetchingType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};

export const toggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type ToggleIsFollowingProgressType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userID: number;
};

export const toggleIsFollowingInProgress = (
  isFetching: boolean,
  userID: number
): ToggleIsFollowingProgressType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userID,
});

// This is thunk
type DispatchType = Dispatch<ActionsType>;
type ThunkActionType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsType
>;

export const getUsersThunk =
  (page: number, pageSize: number): ThunkActionType =>
  async (dispatch: DispatchType) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let data = await userAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };

export const followChangeThunk =
  (userID: number, action: string): ThunkActionType =>
  async (dispatch: DispatchType) => {
    dispatch(toggleIsFetching(true));
    dispatch(toggleIsFollowingInProgress(true, userID));

    let promise;
    switch (action) {
      case 'follow':
        promise = await userAPI.followUser(userID);
        if (promise.resultCode === 0) {
          dispatch(follow(userID));
        }
        break;

      case 'unfollow':
        promise = await userAPI.unfollowUser(userID);
        if (promise.resultCode === 0) {
          dispatch(unFollow(userID));
        }
        break;
    }
    dispatch(toggleIsFollowingInProgress(false, userID));
    dispatch(toggleIsFetching(false));
  };

export default usersReducer;
