"use client";
import classes from "./CoachDetailTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import Tabs from "@/component/atoms/Tabs/Tabs";
import { coachTabs } from "@/developmentContent/enums/enum";
import { useEffect, useState } from "react";
import UsersTable from "@/component/molecules/UsersTable";
import Button from "@/component/atoms/Button";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { Input } from "@/component/atoms/Input";
import { IoSearchOutline } from "react-icons/io5";
import ButtonTabs from "@/component/atoms/ButtonTabs";
import FeedsCom from "@/component/organisms/FeedsCom";
import UserProfile from "@/component/organisms/UserProfile/UserProfile";
import Subscription from "@/component/organisms/Subscription/Subscription";
import useAxios from "@/interceptor/axiosInterceptor";


const CoachDetailTemplate = ({slug}) => {
  const [SelectedTabs, setSelectedTabs] = useState(coachTabs[0]);


  const {Get} = useAxios();
  const [usersData, setUsersData] = useState(null);
  
  
    const getData = async () => {
      const { response } = await Get({
        route: `admin/coach/${slug}`,
      });
      console.log("response", response);
      if(response){
        setUsersData(response.data);
      }
    }
    console.log("usersData", usersData);
  
    useEffect(() => {
      console.log("slug", slug);
      getData();
    }, [slug]);
  return (
    <div>
      <TopHeader title={"coaches"} slug={`/${usersData?.fullName}`}></TopHeader>
      <div className={classes?.tabs}>
        <Tabs
          activeTab={SelectedTabs}
          setActiveTab={setSelectedTabs}
          tabs={coachTabs}
        />
        {SelectedTabs.value === "profile" ? (
          <Button className={classes?.btn} label={"Deactive"} />
        ) : SelectedTabs.value === "feeds" ? (
          <div className={classes?.main}>
            <Input
              mainContClassName={classes?.mainContClassName}
              placeholder={"Search By Name"}
              rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
            />
            <DropDown placeholder={"Location"} />
            <DropDown placeholder={"Status"} />
          </div>
        ) : SelectedTabs.value === "users" ? (
          <div className={classes?.main}>
            <Input
              mainContClassName={classes?.mainContClassName}
              placeholder={"Search By Name"}
              rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
            />
            <DropDown placeholder={"Location"} />
            <DropDown placeholder={"Status"} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={classes?.coachTop}>
        {SelectedTabs.value === "users" ? (
          <UsersTable />
        ) : SelectedTabs.value === "users" ? (
          <UsersTable />
        ) : SelectedTabs.value === "profile" ? (
          <UserProfile />
        ) : SelectedTabs.value === "subscription" ? (
          <Subscription />
        ) : SelectedTabs.value === "feeds" ? (
          <FeedsCom />
        ) : (
          "No data "
        )}
      </div>
    </div>
  );
};

export default CoachDetailTemplate;
