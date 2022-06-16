import React from "react";
import Preloder from "../../Preloader/Preloader";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {

  let contactsUser = [];
  if (!props.profile) {
    return <Preloder />;
  } else {
    for (let key in props.profile.contacts) {
      if (props.profile.contacts[key]) {
        contactsUser.push(props.profile.contacts[key]);
      }
    }
  }

  return (
    <div className={classes.profileInfo}>
      <section className={classes.profileInfo__description}>
        <img src={props.profile.photos.large} alt="" />
        <ProfileStatus updateStatus={props.updateStatusThunk} status={props.status} />
        <p>{props.profile.fullName}</p>
        <p>About Me: {props.profile.aboutMe}</p>
        <ul>
          {contactsUser.map((site, index) => (
            <li key={index}>
              <a href={site} target="_blank" rel="noreferrer">
                {site}
              </a>
            </li>
          ))}
        </ul>
        {props.profile.lookingForAJob ? (
          <p>Поиск работы: {props.profile.lookingForAJobDescription}</p>
        ) : (
          <p>Не ищу работу!!!</p>
        )}
      </section>
    </div>
  );
};

export default ProfileInfo;
