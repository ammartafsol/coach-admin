"use client";
import React from "react";
import classes from "./EditSubscription.module.css";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
export default function EditSubscription() {
  return (
    <BorderWrapper>
      <div className={classes.main}>
        <p className={classes.title}>Edit Plan</p>
        <Input
          label={"Price"}
          placeholder={"$24"}
          mainContClassName={classes.inpMain}
        />
        <Button label={"Save"} className={classes.btn} />
      </div>
    </BorderWrapper>
  );
}
