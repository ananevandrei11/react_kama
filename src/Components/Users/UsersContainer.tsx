import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  getUsersThunk,
  followChangeThunk,
} from '../../Redux/usersReducer';
import {
  getPageSize,
  getUsers,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getIsFollowingInProgress,
} from '../../Redux/usersSelectorReducer';
import Users from './Users';
import Preloder from '../Preloader/Preloader';
import { UsersType } from '../../Types/types';
import { AppStateType } from '../../Redux/reduxStore';

let mapStateToProps = (state: AppStateType) => ({
  users: getUsers(state),
  pageSize: getPageSize(state),
  totalUsersCount: getTotalUsersCount(state),
  currentPage: getCurrentPage(state),
  isFetching: getIsFetching(state),
  isFollowingInProgress: getIsFollowingInProgress(state),
});

type PropsType = {
  users: Array<UsersType>;
  isFollowingInProgress: number[];
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  getUsersThunk: (page: number, pageSize: number) => void;
  followChangeThunk: (userID: number, action: string) => void;
};

class UsersSubContainer extends React.Component<PropsType> {
  onPageChanged = (pageNumber: number) => {
    this.props.getUsersThunk(pageNumber, this.props.pageSize);
  };

  componentDidMount() {
    this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloder /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          followChange={this.props.followChangeThunk}
          isFollowingInProgress={this.props.isFollowingInProgress}
        />
      </>
    );
  }
}

const UsersContainer = compose(
  connect(mapStateToProps, {
    getUsersThunk,
    followChangeThunk,
  })
  // @ts-ignore
)(UsersSubContainer);

export default UsersContainer;
