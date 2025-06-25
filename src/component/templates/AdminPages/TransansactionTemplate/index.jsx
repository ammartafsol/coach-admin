"use client";
import TopHeader from "@/component/atoms/TopHeader";
import React from "react";
import classes from "./TransansactionTemplate.module.css";
import { Input } from "@/component/atoms/Input";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { IoSearchOutline } from "react-icons/io5";
import { transactionCardData } from "@/developmentContent/dummyData";
import TransactionCard from "@/component/molecules/TransactionCard";
import { useSelector } from "react-redux";

const TransansactionTemplate = () => {
    const userData =useSelector(state=>state.authReducer.user);
    console.log("userData", userData);
  return (
    <div>
      <TopHeader title="Transactions">
        <Input
          mainContClassName={classes?.mainContClassName}
          placeholder={"Search By Name"}
          rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
        />
        <DropDown placeholder={"Amount"} />
      </TopHeader>
      <div className={classes.transactionCardContainer}>
      {transactionCardData.map((item) => (
        <TransactionCard
          key={item.id}
         item={item}
        />
      ))}
      </div>
    </div>
  );
};

export default TransansactionTemplate;
