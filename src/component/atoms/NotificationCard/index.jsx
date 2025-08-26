import React, { useState } from "react";
import classes from "./NotificationCard.module.css";
import Image from "next/image";
import { timeAgo, mediaUrl } from "@/resources/utils/helper";
import Button from "@/component/atoms/Button";
import useAxios from "@/interceptor/axiosInterceptor";
import RenderToast from "../RenderToast";
import { useDispatch } from "react-redux";

const NotificationCard = ({
  item,
  left,
  className,
  onAction,
  getData,
  showButton = true,
  onClick = null,
}) => {
  const { Patch } = useAxios();
  const time = timeAgo(item?.createdAt);
  const isSeen = item?.seen;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState("");

  const handleMarkAsSeen = async () => {
    setLoading("seen");
    const { response } = await Patch({
      route: `notifications/seen/${item?._id}`,
    });
    if (response) {
      RenderToast({
        type: "success",
        message: "Notification marked as seen",
      });
      dispatch(removeNotificationCount());
      getData();
      
    }
    setLoading("");
  };

  return (
    <div className={`${classes.registrationContent} ${className}`}>
      <div className={classes.registrationUser}>
        <Image
          src={mediaUrl(item?.receiver?.photo || item?.photo)}
          alt={item?.receiver?.fullName || "User" || item?.fullName}
          width={40}
          height={40}
          className={classes.registrationAvatar}
        />
        <div className={`${classes?.notificationMain} maxLine1`}>
          <div className={classes.notificationText}>
            <div onClick={onClick} className={onClick ? classes.pointer : ""}>
              <div className={classes.registrationName}>{item?.receiver?.fullName || item?.fullName}</div>
              <div className={classes.registrationText}>{item?.receiver?.email || item?.email}</div>
              <div className={classes.registrationText}>{item?.message}</div>
            </div>
            <div className={classes.registrationTime}>{time}</div>
          </div>
          <div
            className={`${classes.registrationActions} ${
              left ? classes.left : ""
            }`}
          >
            {showButton && !isSeen && (
              <Button
                label={loading === "seen" ? "Loading..." : "Seen"}
                className={classes.actionButton}
                onClick={handleMarkAsSeen}
                disabled={loading === "seen"}
                variant="outlined"
              />
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
