"use client";
import React from "react";
import classes from "./ButtonTabs.module.css";

const ButtonTabs = ({ tabs, selectButton, setSelectButton }) => {
  return (
    <div className={classes?.mainParent}>
      {tabs?.map((item, index) => {
        return (
          <div
            onClick={() => {
              setSelectButton(item);
            }}
            key={index}
            className={`${classes?.buttons} ${
              selectButton?.slugId === item?.slugId && classes?.buttonsNormal
            } `}
          >
            {typeof item === "object" ? item.name : item}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonTabs;
