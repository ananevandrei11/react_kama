import { userAPI } from '../API/users-api';
import { UsersType } from '../Types/types';
import { updateObjectInArray } from '../Utils/Helpers/objectHelpers';
import { BaseThunkType, InferActionsType } from './reduxStore';

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkActionType = BaseThunkType<ActionsType>

let initialState = {
  users: [] as UsersType[],
  pageSize: 10 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: true as boolean,
  isFollowingInProgress: [] as number[],
};

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/USERS/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', {
          followed: true,
        }),
      };

    case 'SN/USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', {
          followed: false,
        }),
      };

    case 'SN/USERS/SET_USERS':
      return {
        ...state,
        users: [...action.users],
      };

    case 'SN/USERS/SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case 'SN/USERS/SET_TOTAL_USERS_COUNT':
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };

    case 'SN/USERS/TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
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
  follow: (userID: number) => ({ type: 'SN/USERS/FOLLOW', userID } as const),
  unFollow: (userID: number) => ({ type: 'SN/USERS/UNFOLLOW', userID } as const),
  setUsers: (users: UsersType[]) => ({ type: 'SN/USERS/SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SN/USERS/SET_CURRENT_PAGE', currentPage } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({ type: 'SN/USERS/SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'SN/USERS/TOGGLE_IS_FETCHING', isFetching } as const),
  toggleIsFollowingInProgress: (isFetching: boolean, userID: number) => ({
    type: 'SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
    isFetching,
    userID,
  } as const)
}

export const getUsersThunk = (page: number, pageSize: number): ThunkActionType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.setCurrentPage(page));
  let data = await userAPI.getUsers(page, pageSize);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
};

export const followChangeThunk = (userID: number, action: string): ThunkActionType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  dispatch(actions.toggleIsFollowingInProgress(true, userID));

  let promise;
  switch (action) {
    case 'follow':
      promise = await userAPI.follow(userID);
      if (promise.resultCode === 0) {
        dispatch(actions.follow(userID));
      }
      break;

    case 'unfollow':
      promise = await userAPI.unfollow(userID);
      if (promise.resultCode === 0) {
        dispatch(actions.unFollow(userID));
      }
      break;
  }
  dispatch(actions.toggleIsFollowingInProgress(false, userID));
  dispatch(actions.toggleIsFetching(false));
};

export default usersReducer;
