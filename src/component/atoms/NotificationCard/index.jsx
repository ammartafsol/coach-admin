import React from "react";
import classes from "./NotificationCard.module.css";
import Image from "next/image";
import { timeAgo } from "@/resources/utils/helper";
import Button from "@/component/atoms/Button";

const NotificationCard = ({ item, left, className, onAction, loading ,showButton=true,}) => {
  const time = timeAgo(item?.createdAt);
  const isActioned = item?.status === "accepted" || item?.status === "rejected";

  return (
    <div className={`${classes.registrationContent} ${className}`}>
      <div className={classes.registrationUser}>
        <div className={classes?.notificationMain}>
          <div className={classes.notificationText}>
            <div className={classes.registrationText}>{item?.message}</div>
            <div className={classes.registrationTime}>{time}</div>
          </div>
          <div
            className={`${classes.registrationActions} ${
              left ? classes.left : ""
            }`}
          >
            {isActioned ? (
              <div className={classes.statusText}>
                {item?.status === "accepted" ? "Accepted" : "Rejected"}
              </div>
            ) : (
              <>
              
                {showButton && (
                  <>
                  <Button
                  label="Reject"
                  className={classes.actionButton}
                  onClick={() => onAction("reject", item?._id)}
                  disabled={loading}
                  variant="outlined"
                  
                  
                />
                 
                <Button
                  label="Accept"
                  className={classes.actionButton}
                  onClick={() => onAction("accept", item?._id)}
                  disabled={loading} 
                  variant="success"
                />
                </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
