/* eslint-disable jest/valid-title */
import usersReducer, { actions, InitialStateType } from './usersReducer';

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'Name 0',
        followed: false,
        status: 'Test Status 0',
        photos: {
          large: null,
          small: null,
        },
      },
      {
        id: 1,
        name: 'Name 1',
        followed: false,
        status: 'Test Status 1',
        photos: {
          large: null,
          small: null,
        },
      },
      {
        id: 2,
        name: 'Name 2',
        followed: true,
        status: 'Test Status 2',
        photos: {
          large: null,
          small: null,
        },
      },
      {
        id: 3,
        name: 'Name 3',
        followed: true,
        status: 'Test Status 3',
        photos: {
          large: null,
          small: null,
        },
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    isFollowingInProgress: [],
  };
});

test('follow success', () => {
  const newState = usersReducer(state, actions.follow(1));
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow success', () => {
  const newState = usersReducer(state, actions.unFollow(3));
  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});
