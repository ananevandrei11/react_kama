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
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
        portionSize={10}
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
