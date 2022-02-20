import React from "react";
import StoreContext from "../../StoreContext";
import Friend from "./Friend/Friend";
import classes from './FriendsBar.module.css';

const FriendsBar = () => {
	return <StoreContext.Consumer>
		{
			(store) => {
				let friends = store.getState().sideBar.friends;
				return (
					<section className={classes.friendsBar}>
						{friends.map((friend) =>
							<Friend
								key={friend.id}
								name={friend.name}
								avatar={friend.avatar} />
						)}
					</section>
				)
			}
		}
	</StoreContext.Consumer>
}

export default FriendsBar;