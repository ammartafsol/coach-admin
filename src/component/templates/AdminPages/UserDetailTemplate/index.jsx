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

const UserDetailTemplate = ({ slug }) => {
const {Get, Patch} = useAxios();
const [usersData, setUsersData] = useState(null);
const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const { response } = await Get({
      route: `admin/users/${slug}`,
    });
    console.log("response", response);
    if(response){
      setUsersData(response.data);
    }
    setLoading(false);
  }
  console.log("usersData", usersData);

  useEffect(() => {
    console.log("slug", slug);
    getData();
  }, [slug]);

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
  }

  const [expandedCoach, setExpandedCoach] = useState(null);

  const toggleCoach = (coachId) => {
    if (expandedCoach === coachId) {
      setExpandedCoach(null);
    } else {
      setExpandedCoach(coachId);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className={classes?.TopHeader}>
        <TopHeader title={`users`} slug={`/${usersData?.fullName}` } />
      </div> 
      <BorderWrapper>
        <Coaches item={usersData} key={usersData?._id} handleStatusChange={handleStatusChange} />
        {usersData?.coaches && (
          <>
            <h4 className={classes?.coach}>Coach</h4>
            <div className={classes.coachesList}>
              {Array.isArray(usersData.coaches) ? (
                // Multiple coaches from API
                usersData.coaches.map((coach) => (
                  <BorderWrapper key={coach._id}>
                    <CoachesDetail 
                      toggleCoach={toggleCoach}
                      expandedCoach={expandedCoach}
                      item={coach}
                    />
                  </BorderWrapper>
                ))
              ) : (
                // Single coach object from API
                <BorderWrapper key={usersData.coaches._id}>
                  <CoachesDetail 
                    toggleCoach={toggleCoach}
                    expandedCoach={expandedCoach}
                    item={usersData.coaches}
                  />
                </BorderWrapper>
              )}
            </div>
          </>
        )}
      </BorderWrapper>
    </div>
  );
};

export default UserDetailTemplate;
