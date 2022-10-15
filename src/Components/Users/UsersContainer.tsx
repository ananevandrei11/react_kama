import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  requestUsers,
  followChangeThunk,
  FilterType,
} from '../../Redux/usersReducer';
import {
  getPageSize,
  getUsers,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getIsFollowingInProgress,
  getUsersFIlter,
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
  filter: getUsersFIlter(state),
  isFollowingInProgress: getIsFollowingInProgress(state),
});

type PropsType = {
  users: Array<UsersType>;
  isFollowingInProgress: number[];
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  filter: FilterType,
  requestUsers: (page: number, pageSize: number, filter: FilterType) => void;
  followChangeThunk: (userID: number, action: string) => void;
};

class UsersSubContainer extends React.Component<PropsType> {
  onPageChanged = (pageNumber: number) => {
    this.props.requestUsers(pageNumber, this.props.pageSize, this.props.filter);
  };

  onFilterChanged = (filter: FilterType) => {
    this.props.requestUsers(1, this.props.pageSize, filter);
  }

  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
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
          onFilterChanged={this.onFilterChanged}
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
    requestUsers,
    followChangeThunk,
  })
)(UsersSubContainer);

export default UsersContainer;
