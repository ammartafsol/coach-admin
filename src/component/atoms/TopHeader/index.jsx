import React from "react";
import classes from "./TopHeader.module.css";
import Tabs from "@/component/molecules/TabsComponent";

const TopHeader = ({ children, title, tabsData, selected, setSelected }) => {
  return (
    <div className={classes?.TopHeader}>
      <div className={classes?.mainPoint}>
        Dashboard / <span>{title}</span>
        <div className={classes?.route}>{title}</div>
        {tabsData && (
          <Tabs
            tabsData={tabsData}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </div>
      <div className={classes?.childrenMain}>{children}</div>
    </div>
  );
};

export default TopHeader;
