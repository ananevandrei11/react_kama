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

let mapStateToProps = (state) => {
  return {
    users: state.userPage.users,
    countPage: state.userPage.countPage,
    totalUsersCount: state.userPage.totalUsersCount,
    currentPage: state.userPage.currentPage,
    isFetching: state.userPage.isFetching,
    isFollowingInProgress: state.userPage.isFollowingInProgress,
  };
};

class UsersSubContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsersThunk(pageNumber, this.props.countPage);
  };

  componentDidMount() {
    this.props.getUsersThunk(this.props.currentPage, this.props.countPage);
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloder /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          countPage={this.props.countPage}
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

const UsersContainer = connect(mapStateToProps, {
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFollowingInProgress,
  getUsersThunk,
  followChangeThunk,
})(UsersSubContainer);

export default UsersContainer;
