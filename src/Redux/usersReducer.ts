import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { userAPI } from '../API/Api';
import { UsersType } from '../Types/types';
import { updateObjectInArray } from '../Utils/Helpers/objectHelpers';
import { AppStateType, InferActionsType } from './reduxStore';

let initialState = {
  users: [] as UsersType[],
  pageSize: 10 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: true as boolean,
  isFollowingInProgress: [] as number[],
};

type InitialStateType = typeof initialState;

type ActionsType = InferActionsType<typeof actions>;

const usersReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', {
          followed: true,
        }),
      };

    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', {
          followed: false,
        }),
      };

    case 'SET_USERS':
      return {
        ...state,
        users: [...action.users],
      };

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case 'SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };

    case 'TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

export const actions = {
  follow: (userID: number) => ({
    type: 'FOLLOW',
    userID,
  } as const),
  
  unFollow: (userID: number) => ({
    type: 'UNFOLLOW',
    userID,
  } as const),
  
  
  setUsers: (users: UsersType[]) => ({
    type: 'SET_USERS',
    users,
  } as const),
  
  
  setCurrentPage: (currentPage: number) => ({
    type: 'SET_CURRENT_PAGE',
    currentPage,
  } as const),
  
  setTotalUsersCount: (
    totalUsersCount: number
  ) => ({
    type: 'SET_TOTAL_USERS_COUNT',
    totalUsersCount,
  } as const),
  
  toggleIsFetching: (
    isFetching: boolean
  ) => ({
    type: 'TOGGLE_IS_FETCHING',
    isFetching,
  } as const),
  
  toggleIsFollowingInProgress: (
    isFetching: boolean,
    userID: number
  ) => ({
    type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userID,
  } as const)
}

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
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));

    let data = await userAPI.getUsers(page, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };

export const followChangeThunk =
  (userID: number, action: string): ThunkActionType =>
  async (dispatch: DispatchType) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.toggleIsFollowingInProgress(true, userID));

    let promise;
    switch (action) {
      case 'follow':
        promise = await userAPI.followUser(userID);
        if (promise.resultCode === 0) {
          dispatch(actions.follow(userID));
        }
        break;

      case 'unfollow':
        promise = await userAPI.unfollowUser(userID);
        if (promise.resultCode === 0) {
          dispatch(actions.unFollow(userID));
        }
        break;
    }
    dispatch(actions.toggleIsFollowingInProgress(false, userID));
    dispatch(actions.toggleIsFetching(false));
  };

export default usersReducer;
