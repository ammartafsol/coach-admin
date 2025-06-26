"use client";
import React, { useEffect, useState } from "react";
import classes from "./UserDetailTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import Coaches from "@/component/molecules/Coaches";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import CoachesDetail from "@/component/molecules/CoachesDetails";
import useAxios from "@/interceptor/axiosInterceptor";
import { Loader } from "@/component/atoms/Loader";
import RenderToast from "@/component/atoms/RenderToast";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { STATUS_OPTIONS } from "@/developmentContent/dropdownOption";
import NoData from "@/component/atoms/NoData/NoData";

const SubscriberDetailTemplate = ({ slug }) => {
  const { Get, Patch } = useAxios();
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCoachStatus, setSelectedCoachStatus] = useState(STATUS_OPTIONS[0]); // Set to "All" option object
  const [filteredCoaches, setFilteredCoaches] = useState([]);

  const getData = async () => {
    setLoading(true);
    const { response } = await Get({
      route: `admin/users/${slug}`,
    });
    console.log("response", response);
    if (response) {
      setUsersData(response.data);
    }
    setLoading(false);
  };
  console.log("usersData", usersData);

  useEffect(() => {
    console.log("slug", slug);
    getData();
  }, [slug]);

  // Filter coaches based on selected status
  useEffect(() => {
    if (usersData?.coaches) {
      let coaches = [];
      
      // Convert single coach object to array if needed
      if (Array.isArray(usersData.coaches)) {
        coaches = usersData.coaches;
      } else {
        coaches = [usersData.coaches];
      }

      console.log("All coaches:", coaches);
      console.log("Selected status:", selectedCoachStatus);

      // Filter based on selected status
      if (selectedCoachStatus?.value === "all") {
        setFilteredCoaches(coaches);
      } else {
        const filtered = coaches.filter(coach => {
          // Check multiple possible status fields
          const isBlocked = coach.isBlockedByAdmin;
          const status = coach.status;
          const isActive = coach.isActive;
          
          console.log(`Coach ${coach.fullName}:`, {
            isBlockedByAdmin: isBlocked,
            status: status,
            isActive: isActive
          });
          
          if (selectedCoachStatus?.value === true) {
            // Show active coaches (not blocked)
            return !isBlocked;
          } else if (selectedCoachStatus?.value === false) {
            // Show inactive coaches (blocked)
            return isBlocked;
          }
          
          return true; // Default to show all
        });
        
        console.log("Filtered coaches:", filtered);
        setFilteredCoaches(filtered);
      }
    } else {
      setFilteredCoaches([]);
    }
  }, [usersData, selectedCoachStatus]);

  const handleStatusChange = async (itemData, statusObj) => {
    setLoading("loading");
    if (!itemData?._id || !statusObj) return;

    const statusValue = statusObj.value;

    const { response } = await Patch({
      route: `admin/users/block-unblock/${itemData.slug}`,
      data: { status: statusValue },
    });

    if (response) {
      const statusText = statusValue ? "blocked" : "unblocked";
      RenderToast({
        type: "success",
        message: `User ${statusText} successfully`,
      });
      setLoading("");

      getData();
    } else {
      setLoading("");
    }
  };

  const [expandedCoach, setExpandedCoach] = useState(null);

  const toggleCoach = (coachId) => {
    if (expandedCoach === coachId) {
      setExpandedCoach(null);
    } else {
      setExpandedCoach(coachId);
    }
  };

  const handleCoachStatusChange = (statusObj) => {
    console.log("Selected status:", statusObj);
    setSelectedCoachStatus(statusObj);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className={classes?.TopHeader}>
        <TopHeader title={`subscriber`} slug={`/ ${usersData?.fullName}`} />
      </div>
      <BorderWrapper>
        <Coaches
          item={usersData}
          key={usersData?._id}
          handleStatusChange={handleStatusChange}
        />
        {usersData?.coaches && (
          <>
            <div className={classes.coachStatus}>
              <h4 className={classes?.coach}>Coach</h4>
              <DropDown
                options={STATUS_OPTIONS}
                value={selectedCoachStatus}
                setValue={handleCoachStatusChange}
                placeholder="Status"
              />
            </div>
            <div className={classes.coachesList}>
              {filteredCoaches.length > 0 ? (
                filteredCoaches.map((coach) => (
                  <BorderWrapper key={coach._id}>
                    <CoachesDetail
                      toggleCoach={toggleCoach}
                      expandedCoach={expandedCoach}
                      item={coach}
                    />
                  </BorderWrapper>
                ))
              ) : (
                <NoData />
              )}
            </div>
          </>
        )}
      </BorderWrapper>
    </div>
  );
};

export default SubscriberDetailTemplate;
