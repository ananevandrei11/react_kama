import React from "react";
import Friend from "./Friend/Friend";
import classes from './FriendsBar.module.css';

const FriendsBar = (props) => {
    const friends = props.friends;

    return (
        <section className={classes.friendsBar}>
            {friends.map((friend) =>
                <Friend
                    key={friend.id}
                    name={friend.name}
                    avatar={friend.avatar} />
            )}
        </section>
    );
}

export default FriendsBar;