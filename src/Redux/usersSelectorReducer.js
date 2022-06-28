import { createSelector } from 'reselect';

export const getUsersSelector = (state) => {
	return state.userPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
	return users.filter(user => true);
});

export const getPageSize = (state) => {
	return state.userPage.pageSize;
};

export const getTotalUsersCount = (state) => {
	return state.userPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
	return state.userPage.currentPage;
};

export const getIsFetching = (state) => {
	return state.userPage.isFetching;
};

export const getIsFollowingInProgress = (state) => {
	return state.userPage.isFollowingInProgress;
};