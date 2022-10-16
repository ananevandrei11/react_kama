import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getStatus, getUserProfile } from '../../Redux/profileReducer';
import { AppStateType } from '../../Redux/reduxStore';
import MyPosts from './MyPosts/MyPosts';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type ParamsType = null | {
  userID: any
}

const ProfileContainer = () => {
  const profile = useSelector((state: AppStateType) => state.profilePage.profile);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const userId = useSelector((state: AppStateType) => state.auth.userId);
  const params: ParamsType = useParams();

  const dispatch = useDispatch();

  const refreshProfile = useCallback(() => {
    let actualUserID = params?.userID;
    let userAuthID = isAuth ? userId : 2;
    actualUserID = !actualUserID ? userAuthID : actualUserID;
    dispatch(getUserProfile(Number(actualUserID)));
    dispatch(getStatus(Number(actualUserID)));
  }, [params, isAuth, userId, dispatch]);

  useEffect(() => {
    refreshProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userId?.toString() !== params?.userID) refreshProfile();
  }, [params, userId, refreshProfile]);


  return (
    <div className={classes.content}>
      <ProfileInfo isOwner={!params?.userID} profile={profile} />
      <MyPosts />
    </div>
  );
};

export default ProfileContainer;
