import React from "react";
import { connect } from "react-redux";
import { followCreator, unFollowCreator, setUsersCreator, setCurrentPageCreator, setTotalUsersCountCreator } from "../../Redux/usersReducer";
//import Users from "./Users";
import UsersClass from "./UsersClass";

let mapStateToProps = (state) => {
  return {
    users: state.userPage.users,
    countPage: state.userPage.countPage,
    totalUsersCount: state.userPage.totalUsersCount,
    currentPage: state.userPage.currentPage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userID) => {
      let action = followCreator(userID);
      dispatch(action);
    },
    unFollow: (userID) => {
      let action = unFollowCreator(userID);
      dispatch(action);
    },
    setUsers: (users) => {
      let action = setUsersCreator(users);
      dispatch(action);
    },
    setCurrentPage: (currentPage) => {
      let action = setCurrentPageCreator(currentPage);
      dispatch(action);
    },
    setTotalUsersCount: (totalCount) => {
      let action = setTotalUsersCountCreator(totalCount);
      dispatch(action);
    }
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersClass);

export default UsersContainer;