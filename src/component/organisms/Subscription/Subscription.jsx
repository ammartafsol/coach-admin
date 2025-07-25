"use client";
import React, { useState } from "react";
import classes from "./Subscription.module.css";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import SubscriptionCard from "@/component/molecules/SubscriptionCard/SubscriptionCard";
import Button from "@/component/atoms/Button";
import EditSubscription from "@/component/molecules/EditSubscription/EditSubscription";


export default function Subscription({userData, editSubscription, loading }) {
  const [isEdit, setIsEdit] = useState(false);

  console.log("userData", userData);
  return (
    <div className={classes.main}>
      <div className={isEdit ? classes.editHeader : classes.header}>
        {isEdit && (
          <Button label={"Back"} onClick={() => setIsEdit(false)} />
        )}
      </div>
      {isEdit ? (
        <EditSubscription editSubscription={editSubscription} loading={loading} setIsEdit={setIsEdit} />
      ) : (
        <div className={classes.subscriptionCard}>
          <SubscriptionCard setIsEdit={setIsEdit} userData={userData}  />
        </div>
      )}
    </div>
  );
}
