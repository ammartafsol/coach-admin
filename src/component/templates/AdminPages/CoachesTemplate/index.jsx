"use client";
import { Input } from "@/component/atoms/Input";
import TopHeader from "@/component/atoms/TopHeader";
import DropDown from "@/component/molecules/DropDown/DropDown";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import classes from "./CoachesTemplate.module.css";
import { tableHeadersData } from "@/developmentContent/tableHeader";
import { CoachTableDataBody } from "@/developmentContent/tableBody";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CoachesTemplate = () => {
  const router = useRouter();
  return (
    <div>
      <div className={classes?.TopHeader}>
        <TopHeader title="Coaches">
          <Input
            mainContClassName={classes?.mainContClassName}
            placeholder={"Search By Name"}
            rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
          />
          <DropDown placeholder={"Location"} />
          <DropDown placeholder={"Status"} />
        </TopHeader>
      </div>
      <AppTable
        tableHeader={tableHeadersData}
        data={CoachTableDataBody}
        renderItem={({ item, key, rowIndex, renderValue }) => {
          const rowItem = CoachTableDataBody[rowIndex];
          if (renderValue) {
            return renderValue(item, rowItem);
          }
          if (key === "coachName") {
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
          if (key === "sports") {
            return (
              <div className={classes?.parentMain}>
                <div className={classes?.sports}>{rowItem.sports}</div>
                <span>+3</span>
              </div>
            );
          }
          if (key == "action") {
            return (
              <HiOutlineDotsHorizontal
                size={25}
                cursor={"pointer"}
                className={classes.actionLink}
                onClick={() => router.push("/coach/1")}
              />
            );
          }
          return item || "";
        }}
      />
    </div>
  );
};

export default CoachesTemplate;
