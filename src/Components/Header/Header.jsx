import React from "react";
import logo from './logo.svg';
import classes from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className={classes.header}>
            <NavLink to="/">
                <figure>
                    <img src={logo} alt=" " />
                </figure>
            </NavLink>
        </header>
    );
}

export default Header;