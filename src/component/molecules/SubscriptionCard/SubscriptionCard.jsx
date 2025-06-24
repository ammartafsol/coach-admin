"use client";
import React from "react";
import classes from "./SubscriptionCard.module.css";
import Button from "@/component/atoms/Button";
import { FaUsers } from "react-icons/fa";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import { formatDate } from "@/resources/utils/helper";
export default function SubscriptionCard({
  isActive = true,
  setIsEdit,
  userData,
}) {
  console.log("userData", userData);
  return (
    <BorderWrapper>
      <div className={classes.main}>
        <div className={classes.left}>
          <p className={classes.status}>
            <span
              className={
                isActive ? classes.statusActive : classes.statusInactive
              }
            ></span>
            {isActive ? "Active" : "Inactive"}
          </p>
          <p className={classes.subscriptionType}>
            Monthly - {userData?.subscriptionCost}
          </p>
          <div className={classes.info}>
            <p>{formatDate(userData?.createdAt) || "No start date"}</p>
            <p className={classes.usersInfo}>
              <span>
                <FaUsers fill="#A0C15B" size={18} />
              </span>
              {userData?.noOfSubscribers} Active Users
            </p>
          </div>
        </div>
        <div className={classes.right}>
          <Button
            label={"Edit"}
            className={classes.btn}
            onClick={() => setIsEdit(true)}
          />
        </div>
      </div>
    </BorderWrapper>
  );
}
