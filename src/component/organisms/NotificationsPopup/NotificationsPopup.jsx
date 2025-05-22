// components/NotificationsPopup/NotificationsPopup.jsx
import React from "react";
import classes from "./NotificationsPopup.module.css"; // Optional: use CSS module

export default function NotificationsPopup() {
  return (
    <div className={classes.popupContainer}>
      <strong>Notifications</strong>
      <div>No new notifications.</div>
    </div>
  );
}
