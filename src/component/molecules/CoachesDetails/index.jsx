import React from "react";
import classes from "./CoachesDetail.module.css";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";
import { IoPeople } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import BorderWrapper from "@/component/atoms/BorderWrapper";

const CoachesDetail = ({ item, toggleCoach, expandedCoach }) => {
  return (
    <div className={classes.coachCard}>
      <div className={classes.coachHeader} onClick={() => toggleCoach(item.id)}>
        <div className={classes.coachInfo}>
          <div className={classes.coachAvatar}>
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={80}
              height={80}
              className={classes.avatarImage}
            />
          </div>
          <div className={classes.coachDetails}>
            <h3 className={classes.coachName}>{item.name}</h3>
            <div className={classes.coachRating}>
              {Array(item.rating)
                .fill(0)
                .map((_, i) => (
                  <CiStar />
                ))}
            </div>
            <div className={classes.memberCount}>
              <IoPeople color="#F9E17A" size={18} />
              <span>{item.members} members</span>
            </div>
          </div>
        </div>
        <div className={classes?.main}>
          <button className={classes.expandBtn}>
            {expandedCoach === item.id ? <ChevronDown /> : <ChevronRight />}
          </button>
        </div>
      </div>

      {expandedCoach === item.id && (
        <BorderWrapper>
          <div className={classes.coachContent}>
            <div className={classes.subscriptionDetails}>
              <h4 className={classes.subscriptionPlan}>
                {item.subscription.plan}
              </h4>
              <div className={classes.subscriptionDate}>
                <span>{item.subscription.startDate}</span>
                <div className={classes?.active}>
                  <span className={classes.statusBadge}>
                    {item.subscription.status}
                  </span>
                  <span className={classes?.dots}></span>
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
