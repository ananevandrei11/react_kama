import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const [isAuth, setIsAuth] = useState(props.isAuth);

  useEffect(() => {
    setIsAuth(props.isAuth);
  }, [props.isAuth]);

  return (
    <header className={classes.header}>
      <NavLink to="/">
        <figure>
          <img src={logo} alt=" " />
        </figure>
      </NavLink>
      <div className={classes.login}>
        {isAuth ? (
          <div>
            <h6>{props.login}</h6>
            <button onClick={props.logOutThunk}>Log Out</button>
          </div>
        ) : (
          <NavLink to="/login">LogIn</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
