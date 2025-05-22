"use client";
import React, { useState } from "react";
import classes from "./UserDetailTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import Coaches from "@/component/molecules/Coaches";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import CoachesDetail from "@/component/molecules/CoachesDetails";

const UserDetailTemplate = ({ slug }) => {
  const coachesData = [
    {
      id: 1,
      name: "Terry Hickle",
      rating: 5,
      members: 300,
      subscription: {
        plan: "Monthly - $20",
        startDate: "Jan 2, 2023",
        status: "Active",
      },
      image: "/images/cms-images/profile.png",
    },
    {
      id: 2,
      name: "Terry Hickle",
      rating: 5,
      members: 300,
      subscription: {
        plan: "Yearly - $200",
        startDate: "Feb 15, 2023",
        status: "Active",
      },
      image: "/images/cms-images/profile.png",
    },
    {
      id: 3,
      name: "Terry Hickle",
      rating: 5,
      members: 300,
      subscription: {
        plan: "Quarterly - $50",
        startDate: "Mar 10, 2023",
        status: "Active",
      },
      image: "/images/cms-images/profile.png",
    },
  ];
  const user = {
    name: "Ashley Farms",
    email: "ashleyfarms@mail.com",
    phone: "+1 235 5548 945214",
    location: "New York, NY, USA",
    image: "/images/cms-images/profile.png",
  };

  const [expandedCoach, setExpandedCoach] = useState(1);

  const toggleCoach = (coachId) => {
    if (expandedCoach === coachId) {
      setExpandedCoach(null);
    } else {
      setExpandedCoach(coachId);
    }
  };

  return (
    <div>
      <div className={classes?.TopHeader}>
        <TopHeader title={"Users"} />
      </div>
      <BorderWrapper>
        <Coaches item={user} />
        <h4 className={classes?.coach}>Coach</h4>
        <div className={classes.coachesList}>
          {coachesData?.map((item) => {
            return (
              <BorderWrapper>
                <CoachesDetail
                  toggleCoach={toggleCoach}
                  expandedCoach={expandedCoach}
                  item={item}
                  key={item.id}
                />
              </BorderWrapper>
            );
          })}
        </div>
      </BorderWrapper>
    </div>
  );
};

export default UserDetailTemplate;
