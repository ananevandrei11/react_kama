import React from "react";
import { connect } from "react-redux";
import Friend from "./Friend/Friend";
import classes from './FriendsBar.module.css';

const FriendsBar = (props) => {
	return (
    <section className={classes.friendsBar}>
      {props.friends.map((friend) =>
        <Friend
          key={friend.id}
          name={friend.name}
          avatar={friend.avatar} />
      )}
    </section>
  )
}


let mapStateToProps = (state) => {
	return {
		friends: state.sideBar.friends,
	}
}

const FriendsBarContainer = connect(mapStateToProps)(FriendsBar);

export default FriendsBarContainer;