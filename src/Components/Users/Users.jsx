import React from "react";
import { NavLink } from "react-router-dom";
import userNoAvatar from "../../Asets/images/noavatar.svg";
import classes from './Users.module.css';
import * as axios from 'axios';

const Users = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.countPage);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={classes.pages}>
        {
          pages.map((page, index) =>
            <span
              key={index}
              className={((props.currentPage === page) ? classes.selectedPage : '') + ' ' + classes.numPage}
              onClick={() => { props.onPageChanged(page) }}
            >{page}</span>
          )
        }
      </div>
      {
        props.users.map((user) =>
          <article key={user.id.toString()}>
            <div>
              <figure>
                <NavLink to={"/profile/" + user.id}>
                  <img
                    width="40"
                    height="40"
                    src={
                      (user.photos.small != null) ? user.photos.small : userNoAvatar
                    }
                    alt=" "
                    style={{ backgroundColor: "#fff" }}
                  />
                </NavLink>
              </figure>
              {user.followed
                ?
                <button
                  onClick={() => {
                    axios.delete(
                      `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                      {
                        withCredentials: true,
                        headers: {
                          'API-KEY': '96914468-f3c9-4750-953f-cad879143c90'
                        }
                      })
                      .then(response => {
                        if (response.data.resultCode === 0) {
                          props.unFollow(user.id)
                        }
                      })
                  }}
                >Follow</button>
                :
                <button
                  onClick={() => {
                    axios.post(
                      `https://social-network.samuraijs.com/api/1.0/follow/${user.id}`,
                      {},
                      {
                        withCredentials: true,
                        headers: {
                          'API-KEY': '96914468-f3c9-4750-953f-cad879143c90'
                        }
                      })
                      .then(response => {
                        if (response.data.resultCode === 0) {
                          props.follow(user.id)
                        }
                      })
                  }}
                >Unfollow</button>
              }
            </div>
            <div>
              <p>{user.name}</p>
              <p>{user.status}</p>
              <p>{"user.location.country"}</p>
              <p>{"user.location.city"}</p>
            </div>
          </article>
        )
      }
    </div>
  )
};

export default Users;