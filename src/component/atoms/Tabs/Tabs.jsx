"use client";

import React from "react";
import classes from "./Tabs.module.css";
import { mergeClass } from "@/resources/utils/helper";

const Tabs = ({
  className,
  tabItem,
  activeTab = "",
  setActiveTab = () => {},
  tabs = [],
}) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={classes.tabsContainer}>
      <div className={mergeClass(classes.tabs, className)}>
        {tabs.map((tab) => (
          <div
            key={tab.value}
            className={`${classes.tab} ${tabItem} ${
              activeTab.value === tab.value ? classes.active : ""
            }  `}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
