import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { setUserProfileByID } from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { AuthRedirect } from "../../HOC/AuthRedirect";

class ProfileSubContainer extends React.Component {
  componentDidMount() {
    let userID = this.props.match.params.userID;
    let userAuthID = this.props.isAuth ? this.props.userId : 2;
    userID = !userID ? userAuthID : userID;
    this.props.setUserProfileByID(userID);
  }

  render() {
    return (
      <>
        <Profile {...this.props} profile={this.props.profile} />
      </>
    );
  }
}

let AuthRedirectComponent = AuthRedirect(ProfileSubContainer);

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  userId: state.auth.userId,
});

let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

const ProfileContainer = connect(mapStateToProps, {
  setUserProfileByID,
})(WithUrlDataContainerComponent);

export default ProfileContainer;
