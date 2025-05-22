"use client";
import { Input } from "@/component/atoms/Input";
import TopHeader from "@/component/atoms/TopHeader";
import DropDown from "@/component/molecules/DropDown/DropDown";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import classes from "./CoachesTemplate.module.css";
import { tableHeadersData } from "@/developmentContent/tableHeader";
import { CoachTableDataBody } from "@/developmentContent/tableBody";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";

const CoachesTemplate = () => {
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
      <AppTable tableHeader={tableHeadersData} data={CoachTableDataBody}
            renderItem={({ item, key, rowIndex, renderValue }) => {
              const rowItem = CoachTableDataBody[rowIndex];
              if (renderValue) {
                return renderValue(item, rowItem);
              }
              if(key === 'coachName'){
                return(
                    <div className={classes?.profileParent}>
                        <div className={classes?.profile}>
                            <Image src={"/images/cms-images/profile.png"} fill  alt="profile" />
                        </div>
                        <div className={classes?.userName}>
                        Jenny Wilson
                        </div>
                    </div>
                )
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

export default CoachesTemplate;
