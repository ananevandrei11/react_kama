import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../Redux/reduxStore";
import { logOutThunk } from "../../Redux/authReducer";

const Header = () => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const login = useSelector((state: AppStateType) => state.auth.login)
  const [actualAuth, setActualAuth] = useState(isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    setActualAuth(isAuth);
  }, [isAuth]);

  const handleLogout = () => {
    dispatch(logOutThunk());
  }

  return (
    <header className={classes.header}>
      <NavLink to="/">
        <figure>
          <img src={logo} alt=" " />
        </figure>
      </NavLink>
      <div className={classes.login}>
        {actualAuth ? (
          <div>
            <h6>{login}</h6>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        ) : (
          <NavLink to="/login">LogIn</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
