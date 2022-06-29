import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User/User";
import cls from "./Users.module.css";

const Users = ({
  users,
  followChange,
  isFollowingInProgress,
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      <div className={cls.users}>
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            followChange={followChange}
            isFollowingInProgress={isFollowingInProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
