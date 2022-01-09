import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import classes from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    const myPosts = props.posts;

    return (
        <div className={classes.content}>
            <ProfileInfo />
            <MyPosts
                myPosts={myPosts}
                addPost={props.addPost}
                updatePost={props.updatePost}
                newPostText={props.newPostText}
            />
        </div>
    );
}

export default Profile;