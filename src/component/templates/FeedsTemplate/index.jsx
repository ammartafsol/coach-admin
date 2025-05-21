"use client";
import React from "react";
import classes from "./FeedsTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { Input } from "@/component/atoms/Input";
import { IoSearchOutline } from "react-icons/io5";
import BorderWrapper from "@/component/atoms/BorderWrapper";

const FeedsTemplate = () => {
  return (
    <>
      <TopHeader title="Feed">
        <Input
          mainContClassName={classes?.customStyle}
          placeholder={"Search By Name"}
          rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
        />
        <DropDown placeholder={"Feed"} />
      </TopHeader>
      <div className={classes?.mainWrapper}>
      <BorderWrapper>
      </BorderWrapper>
      </div>

    </>
  );
};

export default FeedsTemplate;
