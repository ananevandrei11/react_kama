import React, { useState } from "react";
import Preloder from "../../Preloader/Preloader";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import ProfileDataForm from "../ProfileDataForm/ProfileDataForm";
import classes from "./ProfileInfo.module.css";
import userNoAvatar from "../../../Asets/images/noavatar.svg";

const ProfileInfo = (props) => {
  let imgProfile;
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloder />;
  } else {
    imgProfile = props.profile.photos.large;
  }

  const onMainPhotoSelected = (e) => {
    props.savePhotoTHunk(e.target.files[0]);
  };

  const toEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (values) => {
    props.saveProfileThunk(values);
    setEditMode(false);
  }

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
          updateStatus={props.updateStatusThunk}
          status={props.status}
        />
        {props.isOwner ? <button onClick={toEditMode}>Edit Mode</button> : null}
        {editMode ? (
          <ProfileDataForm profile={props.profile} handleSubmit={handleSubmit} />
        ) : (
          <ProfileData profile={props.profile} />
        )}
      </section>
    </div>
  );
};

const ProfileImg = ({ imgProfile, isOwner, onChange, classImg }) => {
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

const ProfileData = ({ profile }) => {
  return (
    <div>
      <p>{profile.fullName}</p>
      <p>About Me: {profile.aboutMe}</p>
      <div>
        {Object.keys(profile.contacts).map((site, index) => (
          <ContactsUser key={index} site={profile.contacts[site]} name={site} />
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

const ContactsUser = ({ name, site }) => {
  if (site === "" || site === null) {
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
