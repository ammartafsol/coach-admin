import AppTable from "@/component/organisms/AppTable/AppTable";
import { coachTableData } from "@/developmentContent/tableBody";
import { coachtableHeaders } from "@/developmentContent/tableHeader";
import Image from "next/image";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import classes from "./UsersTable.module.css";

const UsersTable = () => {
  return (
    <div>
      <AppTable
        tableHeader={coachtableHeaders}
        data={coachTableData}
        renderItem={({ item, key, rowIndex, renderValue }) => {
          const rowItem = coachTableData[rowIndex];
          if (renderValue) {
            return renderValue(item, rowItem);
          }
          if (key === "username") {
            return (
              <div className={classes?.profileParent}>
                <div className={classes?.profile}>
                  <Image
                    src={"/images/cms-images/profile.png"}
                    fill
                    alt="profile"
                  />
                </div>
                <div className={classes?.userName}>Jenny Wilson</div>
              </div>
            );
          }
          if (key === 'status') {
            return (
              <div className={classes?.tableParent}>
                <span className={`${rowItem.status === 'un-Subscribe' ? classes?.deactive : ""}`}></span>
                <div className={`${rowItem.status === 'un-Subscribe' ? classes?.deactiveText : classes?.text}`}>
                  {rowItem.status}
                </div>
              </div>
            );
          }
          
          if (key == "action") {
            return (
              <HiOutlineDotsHorizontal
                size={25}
                className={classes.actionLink}
                onClick={(event) => handleActionClick(event, rowIndex)}
              />
            );
          }
          return item || "";
        }}
      />
    </div>
  );
};

export default UsersTable;
