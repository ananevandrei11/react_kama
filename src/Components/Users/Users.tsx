import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FilterType,
  followChangeThunk,
  requestUsers,
} from '../../Redux/usersReducer';
import {
  getCurrentPage,
  getIsFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFIlter,
} from '../../Redux/usersSelectorReducer';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';
import cls from './Users.module.css';
import UsersSearchForm from './UsersSearchForm';

type PropsType = {};

const Users: React.FC<PropsType> = (props) => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFIlter);
  const isFollowingInProgress = useSelector(getIsFollowingInProgress);

  const dispatch = useDispatch();

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  const followChange = (userID: number, action: string) => {
    dispatch(followChangeThunk(userID, action));
  };

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize, filter));
  }, []);

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
        portionSize={10}
      />
      <div className={cls.users}>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            followChange={followChange}
            isFollowingInProgress={isFollowingInProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
