import React from "react";
import classes from "./NotificationCard.module.css";
import Image from "next/image";

const NotificationCard = ({ item, left,className }) => {
  return (
    <div className={`${classes.registrationContent} ${className}`}>
      <div className={classes.registrationUser}>
        <Image
          src="/images/cms-images/user.png"
          alt="Jenny Wilson"
          width={40}
          height={40}
          className={classes.registrationAvatar}
        />
        <div className={classes?.notificationMain}>
        <div >
          <div className={classes.registrationName}>{item?.name}</div>
          <div className={classes.registrationText}>{item?.description}</div>
          <div className={classes.registrationTime}>5min</div>
        </div>
        <div
          className={`${classes.registrationActions} ${
            left ? classes.left : ""
          }`}
        >
          <button className={classes.rejectButton}>Reject</button>
          <button className={classes.acceptButton}>Accept</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
