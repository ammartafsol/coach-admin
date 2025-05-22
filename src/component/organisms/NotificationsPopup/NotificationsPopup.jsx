import React from "react";
import classes from "./NotificationsPopup.module.css";
import { Col, Row } from "react-bootstrap";
import NotificationCard from "@/component/atoms/NotificationCard";
import { notificationCardData } from "@/developmentContent/dummyData";
import { useRouter } from "next/navigation";

export default function NotificationsPopup({ setShowNotifications }) {
  const router = useRouter();
  return (
    <div className={classes.popupContainer}>
      <Row>
        {notificationCardData?.slice(0, 3)?.map((item) => {
          return (
            <Col md={12}>
              <NotificationCard
                className={classes.notificationCardMain}
                key={item.id}
                item={item}
              />
              <hr />
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
            <p>See All</p>
          </div>
        </div>
      </Row>
    </div>
  );
}
