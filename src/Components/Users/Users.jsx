import React, { useRef } from "react";
import * as axios from "axios";
import userNoAvatar from "../../Asets/images/noavatar.svg";

const Users = (props) => {
  let btnGetUser = useRef(null);

  let getUsers = () => {
    let myUrl = 'https://test.aniganweb.ru/testapi/testusers.json';
    let samuraiUrl = 'https://social-network.samuraijs.com/api/1.0/users'
    axios.get(samuraiUrl)
      .then(function (response) {
        props.setUsers(response.data.items);
        btnGetUser.current.style.display = 'none';
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <button
        onClick={() => getUsers()}
        ref={btnGetUser}
      >Get Users</button>
      {
        props.users.map((user) =>
          <article key={user.id.toString()}>
            <div>
              <figure>
                <img
                  width="40"
                  height="40"
                  src={
                    (user.photos.small != null)
                      ? user.photos.small : userNoAvatar
                  }
                  alt=" "
                  style={{ backgroundColor: "red" }}
                />
              </figure>
              {user.followed
                ?
                <button
                  onClick={() => { props.unFollow(user.id) }}
                >Follow</button>
                :
                <button
                  onClick={() => { props.follow(user.id) }}
                >Unfollow</button>}

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