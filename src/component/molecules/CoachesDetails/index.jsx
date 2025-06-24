import React from "react";
import classes from "./CoachesDetail.module.css";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";
import { IoPeople } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import { formatDate, mediaUrl } from "@/resources/utils/helper";

const CoachesDetail = ({ item, toggleCoach, expandedCoach }) => {
  console.log("coaches details  ", item);

  const defaultAvatar = "/images/app-images/user-avatar.png";

  const imageUrl = item?.photo
  const resolvedImage = imageUrl ? mediaUrl(imageUrl) : defaultAvatar;

  return (
    <div className={classes.coachCard}>
      <div className={classes.coachHeader} onClick={() => toggleCoach(item._id)}>
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
            <h3 className={classes.coachName}>{ item.fullName}</h3>
            <div className={classes.coachRating}>
              {Array(item.rating)
                .fill(0)
                .map((_, i) => (
                  <CiStar key={i} />
                ))}
            </div>
            <div className={classes.memberCount}>
              <IoPeople color="#F9E17A" size={18} />
              <span>{item?.noOfSubscribers
              } members</span>
            </div>
          </div>
        </div>
        <div className={classes?.main}>
          <button className={classes.expandBtn}>
            {expandedCoach === ( item._id) ? <ChevronDown /> : <ChevronRight />}
          </button>
        </div>
      </div>

      {expandedCoach === (item._id) && (
        <BorderWrapper>
          <div className={classes.coachContent}>
            <div className={classes.subscriptionDetails}>
              <h4 className={classes.subscriptionPlan}>
                {item?.subscriptionCost|| "No subscription plan"}
              </h4>
              <div className={classes.subscriptionDate}>
                <span>{formatDate(item?.createdAt) || "No start date"}</span>
                <div className={classes?.active}>
                  <span className={`${classes.statusBadge} ${classes.activeStatus}`}>
                    Active
                  </span>
                  <span className={`${classes?.dots} ${classes.activeDots}`}></span>
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
