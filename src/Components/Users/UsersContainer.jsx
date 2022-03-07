import React from "react";
import { connect } from "react-redux";
import { followCreator, unFollowCreator, setUsersCreator } from "../../Redux/usersReducer";
import Users from "./Users";

let mapStateToProps = (state) => {
  return {
    users: state.userPage.users,
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
    }
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;