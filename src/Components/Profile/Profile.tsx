import React from 'react';
import { ProfileType } from '../../Types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type ProfilePropsType = {
  profile: ProfileType;
};

const Profile = (props: ProfilePropsType) => {
  return (
    <div className={classes.content}>
      <ProfileInfo {...props} profile={props.profile} />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
