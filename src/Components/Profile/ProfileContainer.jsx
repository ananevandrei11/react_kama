import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
  setUserProfileByID,
  setStatusThunk,
  updateStatusThunk,
  savePhotoTHunk,
  saveProfileThunk
} from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class ProfileSubContainer extends React.Component {

  refreshProfile() {
    let userID = this.props.match.params.userID;
    let userAuthID = this.props.isAuth ? this.props.userId : 2;
    userID = !userID ? userAuthID : userID;
    this.props.setUserProfileByID(userID);
    this.props.setStatusThunk(userID);
  }
  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.userID !== prevProps.match.params.userID) {
      this.refreshProfile()
    }
  }

  render() {
    return (
      <>
        <Profile isOwner={!this.props.match.params.userID} profile={this.props.profile} {...this.props} />
      </>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
});

const ProfileContainer = compose(
  connect(mapStateToProps, {
    setUserProfileByID,
    setStatusThunk,
    updateStatusThunk,
    savePhotoTHunk,
    saveProfileThunk
  }),
  withRouter,
)(ProfileSubContainer);

export default ProfileContainer;
