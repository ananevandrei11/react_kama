import React from "react";

const Users = (props) => {
  console.log(props.users.length);
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        avatarURL: '',
        fullName: 'Andrei',
        status: 'I am web-developer',
        location: { city: 'Samara', country: 'Russia' },
        followed: false
      },
      {
        id: 2,
        avatarURL: '',
        fullName: 'Sergei',
        status: 'I am backend',
        location: { city: 'Orsk', country: 'Russia' },
        followed: true
      },
      {
        id: 3,
        avatarURL: '',
        fullName: 'Victor',
        status: 'I am frontend',
        location: { city: 'Moscow', country: 'Russia' },
        followed: true
      },
      {
        id: 4,
        avatarURL: '',
        fullName: 'Marina',
        status: 'I am C++',
        location: { city: 'SPb', country: 'Russia' },
        followed: false
      },
    ])
  }
  console.log(props.users);
  return (
    <div>
      {
        props.users.map((user) =>
          <article key={user.id.toString()}>
            <div>
              <figure>
                <img
                  width="20"
                  height="20"
                  src={user.avatarURL}
                  alt=" "
                  style={{backgroundColor: "red"}}
                />
              </figure>
              {user.followed ? <button
                onClick={() => { props.unFollow(user.id) }}>Follow</button> : <button
                  onClick={() => { props.follow(user.id) }}>Unfollow</button>}

            </div>
            <div>
              <p>{user.fullName}</p>
              <p>{user.status}</p>
              <p>{user.location.country}</p>
              <p>{user.location.city}</p>
            </div>
          </article>
        )
      }
    </div>
  )
};

export default Users;