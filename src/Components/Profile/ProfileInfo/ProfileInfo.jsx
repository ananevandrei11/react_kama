import React from "react";
import BGcontent from './blog1.jpg';
import classes from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div className={classes.profileInfo}>
            <figure className={classes.profileInfo__banner}>
                <img src={BGcontent} alt=" " />
            </figure>
            <section className={classes.profileInfo__description}>
                AVA & Description
            </section>
        </div>
    );
}

export default ProfileInfo;