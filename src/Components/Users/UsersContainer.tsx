import React from 'react';
import {  useSelector } from 'react-redux';
import Users from './Users';
import Preloder from '../Preloader/Preloader';
import { getIsFetching } from '../../Redux/usersSelectorReducer';

const UsersContainer = () => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      {isFetching ? <Preloder /> : null}
      <Users />
    </>
  );
};

export default UsersContainer;
