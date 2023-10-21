import React from "react";
import classes from "./Error.module.css";
import ErrorImage  from "../../assets/download.png";

function Error() {


  return (
    <div className={classes.errorCon}>
    <img src={ErrorImage} alt="error" width={"70%"} height={"50%"}/>
      <h1 className={classes.errorHead}>We'll be back shortly</h1>
      <p className={classes.errorPara}>We are fixing a temporary glitch. Sorry for the inconvenience.</p>
      <a href={"/"} className={classes.back}>Go Back</a>
    </div>
  );
}

export default Error;
