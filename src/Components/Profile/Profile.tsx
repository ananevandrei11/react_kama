import React from 'react';
import { ProfileType } from '../../Types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type ProfilePropsType = {
  profile: ProfileType;
  status: string;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (values: ProfileType) => Promise<any>;
  updateStatus: (status: string) => void;
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
