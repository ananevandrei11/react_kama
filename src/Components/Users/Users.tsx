import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
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
  const history = useHistory();

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
    const { search } = history.location;
    const parsed = queryString.parse(search);
    let actualFilter = filter;
    if (!!parsed.term)
      actualFilter = { ...actualFilter, term: parsed.term as string };
    if (!!parsed.friend)
      actualFilter = { ...actualFilter, friend: parsed.friend as string };
    const actualPAge = parsed.page ? Number(parsed.page) : currentPage;
    dispatch(requestUsers(actualPAge, pageSize, actualFilter));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    history.push({
      pathname: '/users',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    });
  }, [filter, currentPage, history]);

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
