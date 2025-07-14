import React, { useState } from "react";
import classes from "./NotificationCard.module.css";
import Image from "next/image";
import { timeAgo, mediaUrl } from "@/resources/utils/helper";
import Button from "@/component/atoms/Button";
import RejectionReasonModal from "@/component/molecules/Modal/RejectionReasonModal";
import AreYouSureModal from "@/component/molecules/Modal/AreYouSureModal";
import useAxios from "@/interceptor/axiosInterceptor";
import RenderToast from "../RenderToast";

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
  const isActioned = item?.status === "accepted" || item?.status === "rejected";

  const [showModal, setShowModal] = useState("");
  const [loading, setLoading] = useState("");

  const handleCoachStatus = async (values) => {
    setLoading("coachStatus");

    const payload = {
      status: showModal === "accept" ? "approved" : "rejected",
      ...(values && { rejectionReason: values.rejectReason }),
    };

    const { response } = await Patch({
      route: `admin/users/coach/status/${item?.slug}`,
      data: payload,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: `Coach ${
          showModal === "accept" ? "approved" : "rejected"
        } successfully`,
      });
      getData();
      setShowModal("");
    }
    setLoading("");
  };

  return (
    <div className={`${classes.registrationContent} ${className}`}>
      <div className={classes.registrationUser}>
        <Image
          src={
            item?.receiver?.photo || item?.photo ? mediaUrl(item?.receiver?.photo || item?.photo) : "/images/app-images/user-avatars.png"
          }
          alt={item?.receiver?.fullName || "User" || item?.fullName}
          width={40}
          height={40}
          className={classes.registrationAvatar}
        />
        <div className={classes?.notificationMain}>
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
                      onClick={() => setShowModal("reject")}
                      disabled={loading}
                      variant="outlined"
                    />
                    <Button
                      label="Accept"
                      className={classes.actionButton}
                      onClick={() => setShowModal("accept")}
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
      {showModal === "reject" && (
        <RejectionReasonModal
          show={showModal === "reject"}
          setShow={setShowModal}
          onConfirm={handleCoachStatus}
          loading={loading === "coachStatus"}
        />
      )}

      {showModal === "accept" && (
        <AreYouSureModal
          show={showModal === "accept"}
          setShow={setShowModal}
          heading={"Approve Coach"}
          subheading={
            "Are you sure you want to approve this coach?"
          }
          confirmButtonLabel={
            loading == "coachStatus" ? "Submitting..." : "Confirm"
          }
          cancelButtonLabel="Cancel"
          confirmButtonVariant="danger"
          cancelButtonVariant="green-outlined"
          onConfirm={() => {
            handleCoachStatus();
          }}
        />
      )}
    </div>
  );
};

export default NotificationCard;
