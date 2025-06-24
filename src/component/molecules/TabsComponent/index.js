"use client";

import clsx from "clsx";
import { useRef } from "react";
import classes from "./TabsComponent.module.css";

export default function Tabs({
  tabsData = [],
  selected = "",
  setSelected = () => {},
  containerClass = "",
  variant = "default",
}) {
  const tabRef = useRef(null);

  return (
    <div
      className={clsx(
        variant === "primary" ? classes.primaryContainer : classes.container,
        containerClass
      )}
      ref={tabRef}
    >
      <ul className={classes.ul}>
        {tabsData.map((item, index) => {
          const isSelected = selected === item.value;

          return (
            <li
              key={index}
              onClick={() => setSelected(item.value)}
              className={clsx(
                classes.list,
                isSelected && classes.listSelected,
                variant === "primary"
                  ? isSelected && classes.primarySelected
                  : isSelected && classes.defaultSelected,
                index !== 0 &&
                  index !== tabsData.length - 1 &&
                  classes.noSideBorders
              )}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
