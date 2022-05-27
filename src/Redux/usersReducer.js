import { userAPI } from "../API/Api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
	users: [],
	countPage: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	isFollowingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userID) {
						return {
							...user,
							followed: true
						};
					}
					return user;
				}),
			};

		case UNFOLLOW:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id === action.userID) {
						return {
							...user,
							followed: false
						};
					}
					return user;
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
				currentPage: action.currentPage
			};

		case SET_TOTAL_USERS_COUNT:
			return {
				...state,
				totalUsersCount: action.totalUsersCount
			};

		case TOGGLE_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching
			};

		case TOGGLE_IS_FOLLOWING_PROGRESS:
			return {
				...state,
				isFollowingInProgress:
					action.isFetching ?
						[...state.isFollowingInProgress, action.userID]
						:
						state.isFollowingInProgress.filter(id => id !== action.userID)
			};

		default:
			return state;
	}
};

export const follow = (userID) => ({
	type: FOLLOW,
	userID
});

export const unFollow = (userID) => ({
	type: UNFOLLOW,
	userID
});

export const setUsers = (users) => ({
	type: SET_USERS,
	users
});

export const setCurrentPage = (currentPage) => ({
	type: SET_CURRENT_PAGE,
	currentPage
});

export const setTotalUsersCount = (totalUsersCount) => ({
	type: SET_TOTAL_USERS_COUNT,
	totalUsersCount
});

export const toggleIsFetching = (isFetching) => ({
	type: TOGGLE_IS_FETCHING,
	isFetching
});

export const toggleIsFollowingInProgress = (isFetching, userID) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userID
});

// This is thunk
export const getUsersThunk = (currentPage, countPage) => {
	return (dispatch) => {
		dispatch(toggleIsFetching(true));
		userAPI.getUsers(currentPage, countPage).then(data => {
			dispatch(toggleIsFetching(false));
			dispatch(setUsers(data.items));
			if (currentPage <= 1) {
				dispatch(setTotalUsersCount(
					(data.totalCount > 100) ? 100 : data.totalCount
				));
			} else {
				dispatch(setCurrentPage(currentPage));
			}
		});
	}
};

export const followChangeThunk = (userID, action) => {
	return (dispatch) => {
		dispatch(toggleIsFetching(true));
		dispatch(toggleIsFollowingInProgress(true, userID));
		if (action === 'follow') {
			userAPI.followUser(userID)
				.then(data => {
					if (data.resultCode === 0) {
						dispatch(follow(userID));
					}
					dispatch(toggleIsFollowingInProgress(false, userID));
					dispatch(toggleIsFetching(false));
				})
		} else if (action === 'unfollow') {
			userAPI.unfollowUser(userID)
				.then(data => {
					if (data.resultCode === 0) {
						dispatch(unFollow(userID));
					}
					dispatch(toggleIsFollowingInProgress(false, userID));
					dispatch(toggleIsFetching(false));
				})
		}
	}
};

export default usersReducer;