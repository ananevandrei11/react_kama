import React from "react";
import Spinner from "../../Asets/images/Spinner.svg";
import classes from './Preloader.module.css';

let Preloder = (props) => {
  return (
    <div className={classes.preloader}>
      <img src={Spinner} className={classes.preloader__img}/>
    </div>
  )
}

export default Preloder