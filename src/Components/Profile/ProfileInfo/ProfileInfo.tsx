import React, { ChangeEvent, useState } from 'react';
import Preloder from '../../Preloader/Preloader';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import ProfileDataForm from '../ProfileDataForm/ProfileDataForm';
import classes from './ProfileInfo.module.css';
import userNoAvatar from '../../../Asets/images/noavatar.svg';
import { ContactsType, ProfileType } from '../../../Types/types';

type ProfilePropsType = {
  profile: ProfileType;
  status: string;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (values: ProfileType) => Promise<any>;
  updateStatus: (status: string) => void;
};

const ProfileInfo = (props: ProfilePropsType) => {
  let imgProfile;
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloder />;
  } else {
    imgProfile = props.profile.photos?.large;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) props.savePhoto(e.target.files[0]);
  };

  const toEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (values: ProfileType) => {
    props.saveProfile(values);
    setEditMode(false);
  };

  return (
    <div className={classes.profileInfo}>
      <section className={classes.profileInfo__description}>
        <ProfileImg
          classImg={classes.imgProfile}
          imgProfile={imgProfile}
          isOwner={props.isOwner}
          onChange={onMainPhotoSelected}
        />
        <ProfileStatus
          updateStatus={props.updateStatus}
          status={props.status}
        />
        {props.isOwner ? <button onClick={toEditMode}>Edit Mode</button> : null}
        {editMode ? (
          <ProfileDataForm
            profile={props.profile}
            handleSubmit={handleSubmit}
          />
        ) : (
          <ProfileData profile={props.profile} />
        )}
      </section>
    </div>
  );
};

type ProfileImgType = {
  imgProfile: string | null | undefined;
  isOwner: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  classImg: string;
};

const ProfileImg = ({
  imgProfile,
  isOwner,
  onChange,
  classImg,
}: ProfileImgType) => {
  return (
    <div>
      <img
        className={classImg}
        src={imgProfile ? imgProfile : userNoAvatar}
        alt=""
      />
      {isOwner ? <input type="file" onChange={onChange} /> : null}
    </div>
  );
};

type ProfileDataType = {
  profile: ProfileType;
};
const ProfileData = ({ profile }: ProfileDataType) => {
  return (
    <div>
      <p>{profile.fullName}</p>
      <p>About Me: {profile.aboutMe}</p>
      <div>
        {profile.contacts &&
          Object.keys(profile.contacts).map((key) => (
            <ContactsUser
              key={key}
              site={
                profile.contacts && profile.contacts[key as keyof ContactsType]
              }
              name={key}
            />
          ))}
      </div>
      {profile.lookingForAJob ? (
        <p>Поиск работы: {profile.lookingForAJobDescription}</p>
      ) : (
        <p>Не ищу работу!!!</p>
      )}
    </div>
  );
};

type ContactsUserType = { name: string; site: string | null | undefined };

const ContactsUser = ({ name, site }: ContactsUserType) => {
  if (site === '' || site === null) {
    return null;
  }
  return (
    <div>
      <a href={site} target="_blank" rel="noreferrer">
        {name}
      </a>
    </div>
  );
};

export default ProfileInfo;
