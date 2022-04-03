import React from "react";
import { connect } from "react-redux";
import { follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleIsFollowingInProgress } from "../../Redux/usersReducer";
import Users from "./Users";
import Preloder from "../Preloader/Preloader";
import { userAPI } from "../../API/Api";

let mapStateToProps = (state) => {
  return {
    users: state.userPage.users,
    countPage: state.userPage.countPage,
    totalUsersCount: state.userPage.totalUsersCount,
    currentPage: state.userPage.currentPage,
    isFetching: state.userPage.isFetching,
    isFollowingInProgress: state.userPage.isFollowingInProgress,
  }
}

class UsersSubContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  onPageChanged = (pageNumber) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(pageNumber);
    userAPI.getUsers(pageNumber, this.props.countPage).then(data => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
    });
  }

  follow = (userID) => {
    this.props.toggleIsFollowingInProgress(true, userID);
    userAPI.followUser(userID)
      .then(data => {
        if (data.resultCode === 0) {
          this.props.follow(userID);
        }
        this.props.toggleIsFollowingInProgress(false, userID);
      })
  }

  unFollow = (userID) => {
    this.props.toggleIsFollowingInProgress(true, userID);
    userAPI.unfollowUser(userID)
      .then(data => {
        if (data.resultCode === 0) {
          this.props.unFollow(userID);
        }
        this.props.toggleIsFollowingInProgress(false, userID);
      })
  }

  componentDidMount() {
    this.props.toggleIsFetching(true);
    userAPI.getUsers(this.props.currentPage, this.props.countPage).then(data => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
      this.props.setTotalUsersCount(
        (data.totalCount > 100) ? 100 : data.totalCount
      );
    });
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
          unFollow={this.unFollow}
          follow={this.follow}
          isFetching={this.props.isFetching}
          isFollowingInProgress={this.props.isFollowingInProgress}
        />
      </>
    )
  }
}

const UsersContainer = connect(mapStateToProps, {
  follow,
  unFollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  toggleIsFollowingInProgress
})(UsersSubContainer);

export default UsersContainer;