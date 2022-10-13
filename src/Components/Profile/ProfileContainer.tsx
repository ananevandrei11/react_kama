import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from '../../Redux/profileReducer';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/reduxStore';
import { ProfileType } from '../../Types/types';

class ProfileSubContainer extends React.Component<
  MapStateToPropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>
> {
  refreshProfile() {
    let userID = this.props.match.params.userID;
    let userAuthID = this.props.isAuth ? this.props.userId : 2;
    userID = !userID ? userAuthID : userID;
    this.props.getUserProfile(userID);
    this.props.getStatus(userID);
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <>
        <Profile
          isOwner={!this.props.match.params.userID}
          // @ts-ignore
          profile={this.props.profile}
          {...this.props}
        />
      </>
    );
  }
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
  getUserProfile: (userID: any) => void;
  getStatus: (userID: any) => void;
  savePhoto: (file: File) => void;
  saveProfile: (values: ProfileType) => Promise<any>;
  updateStatus: (status: string) => void;
};

type PathParamsType = {
  userID: any
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
  userId: state.auth.userId,
});

const ProfileContainer = compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter
)(ProfileSubContainer);

export default ProfileContainer;
