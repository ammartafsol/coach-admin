import React from "react";
import classes from "./CoachesDetail.module.css";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";
import { IoPeople } from "react-icons/io5";
import { CiMail, CiStar } from "react-icons/ci";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import { formatDate, mediaUrl } from "@/resources/utils/helper";

const CoachesDetail = ({ item, toggleCoach, expandedCoach }) => {
  console.log("coaches details  ", item);

  const defaultAvatar = "/images/app-images/user-avatar.png";

  const imageUrl = item?.photo;
  const resolvedImage = imageUrl ? mediaUrl(imageUrl) : defaultAvatar;

  return (
    <div className={classes.coachCard}>
      <div
        className={classes.coachHeader}
        onClick={() => toggleCoach(item._id)}
      >
        <div className={classes.coachInfo}>
          <div className={classes.coachAvatar}>
            <Image
              src={resolvedImage}
              alt={item?.fullName}
              width={80}
              height={80}
              className={classes.avatarImage}
            />
          </div>
          <div className={classes.coachDetails}>
            <h3 className={classes.coachName}>{item?.fullName}</h3>
            <div className={classes.contactItem}>
              <span>{item?.email}</span>
              <span>{item?.phoneNumber}</span>
            </div>
            <div className={classes.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={
                    star <= item?.rating ? classes.starFilled : classes.starEmpty
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={star <= item?.rating ? "currentColor" : "none"}
                  stroke="currentColor"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <div className={classes.memberCount}>
              <IoPeople color="#F9E17A" size={18} />
              <span>{item?.noOfSubscribers} members</span>
            </div>
          </div>
        </div>
        <div className={classes?.main}>
          <button className={classes.expandBtn}>
            {expandedCoach === item._id ? <ChevronDown /> : <ChevronRight />}
          </button>
        </div>
      </div>

      {expandedCoach === item._id && (
        <BorderWrapper>
          <div className={classes.coachContent}>
            <div className={classes.subscriptionDetails}>
              <h4 className={classes.subscriptionPlan}>
                Monthly Subscription -{" "}
                <span>£{item?.subscriptionCost || "No subscription plan"}</span>
              </h4>
              <div className={classes.subscriptionDate}>
                <span>{formatDate(item?.createdAt) || "No start date"}</span>
                <div className={classes?.active}>
                  <span
                    className={`${classes.statusBadge} ${classes.activeStatus}`}
                  >
                    Active
                  </span>
                  <span
                    className={`${classes?.dots} ${classes.activeDots}`}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </BorderWrapper>
      )}
    </div>
  );
};

export default CoachesDetail;
