"use client"
import React, { useEffect, useState } from 'react';
import classes from "./NotificationTemplate.module.css"
import TopHeader from '@/component/atoms/TopHeader';
import { Input } from '@/component/atoms/Input';
import { IoSearchOutline } from 'react-icons/io5';
import BorderWrapper from '@/component/atoms/BorderWrapper';
import NotificationCard from '@/component/atoms/NotificationCard';
import useAxios from '@/interceptor/axiosInterceptor';
import RenderToast from "@/component/atoms/RenderToast";
import useDebounce from '@/resources/hooks/useDebounce';
import FilterHeader from "@/component/molecules/FilterHeader/FilterHeader";
import { Loader } from "@/component/atoms/Loader";

const NotificationTemplate = () => {
  const { Get, Patch } = useAxios();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);


  const getData = async (
    // _search = debounceSearch,
  ) => {
    setLoading(true);
    const { response } = await Get({
      route: `notifications`,
    });
    console.log("response", response);
    if (response) {
      setNotifications(response?.notifications);
      console.log("notifications", notifications);
    }
    setLoading(false);
  };

  const handleAction = async (action, itemId) => {
    console.log("action", action);
    console.log("itemId", itemId);
   
      setLoading(true);
      const { response } = await Patch({
        // route: `notifications/${itemId}/${action}`,
      });
      
      if (response) {
        RenderToast({
          type: "success",
          message: `Notification updated successfully`,
        });
        
        // Update the notification status in local state
        // setNotifications(prev => 
        //   prev.map(notification => 
        //     notification._id === itemId 
        //       ? { ...notification, status: action }
        //       : notification
        //   )
        // );
      }
      setLoading(false);
  };

  useEffect(() => {
    getData(
    // _search = debounceSearch,
    );
  }, []);

  return (
    <div>
        <TopHeader title={"Notifications"}>
        <FilterHeader
          inputPlaceholder="Search By Message"
          customStyle={{ width: "300px" }}
          onChange={(e) => {
            setSearch(e.target.value);
            getData(
              _search = debounceSearch,
            );
          }}
        />
        </TopHeader>
        <div className={classes?.notificationHeader}>
        <BorderWrapper>
            <div className={classes?.notificationMain}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <Loader />
              </div>
            ) : notifications && notifications.length > 0 ? (
              notifications.map((item) => (
                <div key={ item._id}>
                  <NotificationCard
                    item={item}
                    left={true}
                    onAction={handleAction}
                    loading={loading}
                  />
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6d6d6d' }}>
                No notifications available
              </div>
            )}
            </div>
        </BorderWrapper>
        </div>
    </div>
  )
}

export default NotificationTemplate