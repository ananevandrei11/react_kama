import React from "react";
import Preloder from "../../Preloader/Preloader";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import classes from "./ProfileInfo.module.css";
import userNoAvatar from "../../../Asets/images/noavatar.svg";

const ProfileInfo = (props) => {
  let contactsUser = [];
  let imgProfile;

  if (!props.profile) {
    return <Preloder />;
  } else {
    for (let key in props.profile.contacts) {
      if (props.profile.contacts[key]) {
        contactsUser.push(props.profile.contacts[key]);
      }
    }
    imgProfile = props.profile.photos.large;
  }

  const onMainPhotoSelected = (e) => {
    props.savePhotoTHunk(e.target.files[0]);
  };

  return (
    <div className={classes.profileInfo}>
      <section className={classes.profileInfo__description}>
        <img
          className={classes.imgProfile}
          src={imgProfile !== null ? imgProfile : userNoAvatar}
          alt=""
        />
        {props.isOwner ? (
          <input type="file" onChange={onMainPhotoSelected} />
        ) : null}
        <ProfileStatus
          updateStatus={props.updateStatusThunk}
          status={props.status}
        />
        <p>{props.profile.fullName}</p>
        <p>About Me: {props.profile.aboutMe}</p>
        <div>
          {contactsUser.map((site, index) => (
            <ContactsUser key={index} site={site}/>
          ))}
        </div>
        {props.profile.lookingForAJob ? (
          <p>Поиск работы: {props.profile.lookingForAJobDescription}</p>
        ) : (
          <p>Не ищу работу!!!</p>
        )}
      </section>
    </div>
  );
};

const ContactsUser = ({ site }) => {
  console.log(site);
  return (
    <div>
      <a href={site} target="_blank" rel="noreferrer">
        {site}
      </a>
    </div>
  );
};

export default ProfileInfo;
