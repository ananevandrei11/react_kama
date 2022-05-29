import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfileByID } from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";

class ProfileSubContainer extends React.Component {
  componentDidMount() {
    let userID = this.props.match.params.userID;
    let userAuthID = this.props.isAuth ? this.props.userId : 2;
    userID = !userID ? userAuthID : userID;
    this.props.setUserProfileByID(userID);
  }

  render() {
    if (!this.props.isAuth) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <Profile {...this.props} profile={this.props.profile} />
      </>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
});

let WithUrlDataContainerComponent = withRouter(ProfileSubContainer);

const ProfileContainer = connect(mapStateToProps, {
  setUserProfileByID,
})(WithUrlDataContainerComponent);

export default ProfileContainer;
