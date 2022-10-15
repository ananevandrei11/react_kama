import React from 'react';
import { FilterType } from '../../Redux/usersReducer';
import { UsersType } from '../../Types/types';
import Paginator from '../Common/Paginator/Paginator';
import User from './User/User';
import cls from './Users.module.css';
import UsersSearchForm from './UsersSearchForm';

type PropsType = {
  users: Array<UsersType>;
  isFollowingInProgress: number[];
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  followChange: (userID: number, action: string) => void;
  onPageChanged: (page: number) => void;
  onFilterChanged: (filter: FilterType) => void;
};

const Users: React.FC<PropsType> = ({
  users,
  followChange,
  isFollowingInProgress,
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  onFilterChanged
}) => {
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
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
