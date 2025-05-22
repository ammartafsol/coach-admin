"use client";
import classes from "./CoachDetailTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import Tabs from "@/component/atoms/Tabs/Tabs";
import { coachTabs } from "@/developmentContent/enums/enum";
import { useState } from "react";
import UsersTable from "@/component/molecules/UsersTable";
import Button from "@/component/atoms/Button";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { Input } from "@/component/atoms/Input";
import { IoSearchOutline } from "react-icons/io5";

const CoachDetailTemplate = () => {
  const [SelectedTabs, setSelectedTabs] = useState(coachTabs[0]);
  return (
    <div>
      <TopHeader title={"Mathew Ward"}></TopHeader>
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
        ):SelectedTabs.value === 'users'?
        <div className={classes?.main}>
        <Input
          mainContClassName={classes?.mainContClassName}
          placeholder={"Search By Name"}
          rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
        />
        <DropDown placeholder={"Location"} />
        <DropDown placeholder={"Status"} />
      </div>
        : (
          ""
        )}
      </div>
      <div className={classes?.coachTop}>
        {SelectedTabs.value === "users" ? <UsersTable /> : "dsa"}
      </div>
    </div>
  );
};

export default CoachDetailTemplate;
