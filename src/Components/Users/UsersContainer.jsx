import React from "react";
import { connect } from "react-redux";
import {
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFollowingInProgress,
  getUsersThunk,
  followChangeThunk,
} from "../../Redux/usersReducer";
import Users from "./Users";
import Preloder from "../Preloader/Preloader";
import { compose } from "redux";
import { withAuthRedirect } from "../../HOC/AuthRedirect";
import {
  getPageSize,
  getUsers,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getIsFollowingInProgress,
} from "../../Redux/usersSelectorReducer";

let mapStateToProps = (state) => ({
  users: getUsers(state),
  pageSize: getPageSize(state),
  totalUsersCount: getTotalUsersCount(state),
  currentPage: getCurrentPage(state),
  isFetching: getIsFetching(state),
  isFollowingInProgress: getIsFollowingInProgress(state),
});

class UsersSubContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPageChanged = (pageNumber) => {
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
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFollowingInProgress,
    getUsersThunk,
    followChangeThunk,
  }),
  // withAuthRedirect,
)(UsersSubContainer);

export default UsersContainer;
