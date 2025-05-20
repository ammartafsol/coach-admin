import React from "react";
import classes from "./TopHeader.module.css";

const TopHeader = ({ children,title }) => {
  return (
    <div className={classes?.TopHeader}>
      <div className={classes?.mainPoint}>
        Dashboard / <span>{title}</span>
        <div className={classes?.route}>{title}</div>
      </div>
      <div className={classes?.childrenMain}>
        {children}
      </div>
    </div>
  );
};

export default TopHeader;
