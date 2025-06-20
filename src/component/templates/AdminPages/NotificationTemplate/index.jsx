"use client"
import React, { useEffect } from 'react';
import classes from "./NotificationTemplate.module.css"
import TopHeader from '@/component/atoms/TopHeader';
import { Input } from '@/component/atoms/Input';
import { IoSearchOutline } from 'react-icons/io5';
import BorderWrapper from '@/component/atoms/BorderWrapper';
import { notificationData } from '@/developmentContent/dummyData';
import NotificationCard from '@/component/atoms/NotificationCard';
import useAxios from '@/interceptor/axiosInterceptor';

const NotificationTemplate = () => {
  const { Get } = useAxios();


  const getData = async () => {
    const { response } = await Get({
      route: `notifications`,
    });
    console.log("response", response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
        <TopHeader title={"Notifications"}>
        <Input
          mainContClassName={classes?.mainContClassName}
          placeholder={"Search By Name"}
          rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
        />
        </TopHeader>
        <div className={classes?.notificationHeader}>
        <BorderWrapper>
            <div className={classes?.notificationMain}>
                {
                    notificationData?.map((item)=>{
                        return(
                            <>
                            <NotificationCard left={true}  item={item} key={item.id} />
                            <hr />
                            </>
                        )
                    })
                }
            </div>
        </BorderWrapper>
        </div>
    </div>
  )
}

export default NotificationTemplate