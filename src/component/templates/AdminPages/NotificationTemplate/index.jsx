"use client";
import React, { useEffect, useState } from "react";
import classes from "./NotificationTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import NotificationCard from "@/component/atoms/NotificationCard";
import useAxios from "@/interceptor/axiosInterceptor";
import RenderToast from "@/component/atoms/RenderToast";
import useDebounce from "@/resources/hooks/useDebounce";
import FilterHeader from "@/component/molecules/FilterHeader/FilterHeader";
import { Loader } from "@/component/atoms/Loader";
import NoData from "@/component/atoms/NoData/NoData";
import { setUnseenNotifications } from "@/store/common/commonSlice";
import { useDispatch, useSelector } from "react-redux";

// import { saveNotifications } from "@/store/notifications/notificationSlice";

const NotificationTemplate = () => {
  const { Get, Patch } = useAxios();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const notificationsState = useSelector(
    (state) => state.commonReducer.unseenNotifications
  );
 const userData =useSelector(state=>state.authReducer.user);
  console.log("userData", userData);
  
  const getData = async () =>
    // _search = debounceSearch,
    {
      setLoading(true);
      const { response } = await Get({
        route: `notifications`,
      });
      if (response) {
        // dispatch(saveNotifications(response?.notifications));
        dispatch(setUnseenNotifications(response?.notifications));
      }
      setLoading(false);
    };

  const handleAction = async (action, itemId) => {
    setLoading(true);
    const { response } = await Patch({
      // route: `notifications/${itemId}/${action}`,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: `Notification updated successfully`,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <TopHeader title={"Notifications"}>
        <FilterHeader
          inputPlaceholder="Search By Message"
          customStyle={{ width: "300px" }}
          onChange={(e) => {
            setSearch(e.target.value);
            // getData(
            // _search = debounceSearch,
            // );
          }}
        />
      </TopHeader>
      <div className={classes?.notificationHeader}>
        <BorderWrapper>
          <div className={classes?.notificationMain}>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2rem",
                }}
              >
                <Loader />
              </div>
            ) : notificationsState && notificationsState.length > 0 ? (
              notificationsState.map((item) => (
                <div key={item._id}>
                  <NotificationCard
                    item={item}
                    left={true}
                    onAction={handleAction}
                    loading={loading}
                    getData={getData}
                  />
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "#6d6d6d",
                }}
              >
                <NoData text="No notifications available" />
              </div>
            )}
          </div>
        </BorderWrapper>
      </div>
    </div>
  );
};

export default NotificationTemplate;
