"use client"

import React, { useEffect, useState } from "react";
import classes from "./NotificationsPopup.module.css";
import { Col, Row } from "react-bootstrap";
import NotificationCard from "@/component/atoms/NotificationCard";
import { useRouter } from "next/navigation";
import useAxios from "@/interceptor/axiosInterceptor";
import { Loader } from "@/component/atoms/Loader";

export default function NotificationsPopup({ setShowNotifications }) {
  const { Get } = useAxios();
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const { response } = await Get({
      route: `notifications`,
    });
    console.log("response", response);
    if (response) {
      setNotifications(response?.notifications);
      setCount(response?.totalRecords);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const router = useRouter();
  
  if (loading) {
    return (
      <div className={classes.popupContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.popupContainer}>
      <Row className={classes.notificationRow}>
        {notifications?.slice(0, 3)?.map((item) => {
          return (
            <Col md={12}>
              <NotificationCard
                className={classes.notificationCardMain}
                key={item._id}
                item={item}
                showButton={false}
              />
            </Col>
          );
        })}
        <div className={classes.seeAllMain}>
          <div
            className={classes.seeAll}
            onClick={() => {
              router.push("/notification");
              setShowNotifications(false);
            }}
          >
            <p>See All ({count})</p>
          </div>
        </div>
      </Row>
    </div>
  );
}
