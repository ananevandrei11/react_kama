import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
  setUserProfileByID,
  setStatusThunk,
  updateStatusThunk,
} from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../HOC/AuthRedirect";
import { compose } from "redux";

class ProfileSubContainer extends React.Component {
  componentDidMount() {
    let userID = this.props.match.params.userID;
    let userAuthID = this.props.isAuth ? this.props.userId : 2;
    userID = !userID ? userAuthID : userID;
    this.props.setUserProfileByID(userID);
    this.props.setStatusThunk(userID);
  }

  render() {
    return (
      <>
        <Profile {...this.props} profile={this.props.profile} />
      </>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.auth.userId,
});

const ProfileContainer = compose(
  connect(mapStateToProps, {
    setUserProfileByID,
    setStatusThunk,
    updateStatusThunk,
  }),
  withRouter,
  // withAuthRedirect
)(ProfileSubContainer);

export default ProfileContainer;
