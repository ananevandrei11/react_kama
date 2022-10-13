import React from 'react';
import { NavLink } from 'react-router-dom';
import userNoAvatar from '../../../Asets/images/noavatar.svg';
import { UsersType } from '../../../Types/types';
import cls from './User.module.css';

type UserPropType = {
  user: UsersType;
  followChange: (userID: number, action: string) => void;
  isFollowingInProgress: number[];
};

const User: React.FC<UserPropType> = ({ user, followChange, isFollowingInProgress }) => {
  return (
    <article>
      <div>
        <figure>
          <NavLink to={'/profile/' + user.id} className={cls.link}>
            <img
              width="40"
              height="40"
              src={user.photos.small != null ? user.photos.small : userNoAvatar}
              alt=" "
              className={cls.link__img}
            />
          </NavLink>
        </figure>
        {user.followed ? (
          <button
            onClick={() => {
              followChange(user.id, 'unfollow');
            }}
            disabled={isFollowingInProgress.some((id) => id === user.id)}
          >
            Follow
          </button>
        ) : (
          <button
            onClick={() => {
              followChange(user.id, 'follow');
            }}
            disabled={isFollowingInProgress.some((id) => id === user.id)}
          >
            Unfollow
          </button>
        )}
      </div>
      <div>
        <p>{user.name}</p>
        <p>{user.status}</p>
        <p>{'user.location.country'}</p>
        <p>{'user.location.city'}</p>
      </div>
    </article>
  );
};

export default User;
