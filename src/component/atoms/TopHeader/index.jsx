import React from "react";
import classes from "./TopHeader.module.css";

const TopHeader = ({ children }) => {
  return (
    <div className={classes?.TopHeader}>
      <div className={classes?.mainPoint}>
        Dashboard / <span>Users</span>
        <div className={classes?.route}>Users</div>
      </div>
      <div className={classes?.childrenMain}>
        {children}
      </div>
    </div>
  );
};

export default TopHeader;
