"use client";
import React from "react";
import classes from "./UserTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { Input } from "@/component/atoms/Input";
import { IoSearchOutline } from "react-icons/io5";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { tableHeaders, tableUserHeaders } from "@/developmentContent/tableHeader";
import { CoachTableBody, tableUserData } from "@/developmentContent/tableBody";

const UserTemplate = () => {
  return (
    <div>
      <TopHeader>
        <DropDown placeholder={"Location"} />
        <DropDown placeholder={"Status"} />
        <Input
          mainContClassName={classes?.mainContClassName}
          placeholder={"Search By Name"}
          rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
        />
      </TopHeader>
      <AppTable tableHeader={tableUserHeaders} data={tableUserData}
            renderItem={({ item, key, rowIndex, renderValue }) => {
              const rowItem = CoachTableBody[rowIndex];
              if (renderValue) {
                return renderValue(item, rowItem);
              }
              if (key == "action") {
                return (
                 <HiOutlineDotsHorizontal  size={25} className={classes.actionLink}
                 onClick={() => router.push("/merchant/product/1")} />
                );
              }
              return item || "";
            }}
          />
    </div>
  );
};

export default UserTemplate;
