"use client"
import classes from "./CoachDetailTemplate.module.css"
import TopHeader from '@/component/atoms/TopHeader';
import Tabs from '@/component/atoms/Tabs/Tabs';
import { coachTabs } from '@/developmentContent/enums/enum';
import { useState } from "react";

const CoachDetailTemplate = () => {
    const [SelectedTabs,setSelectedTabs] = useState(coachTabs[0]);

  return (
    <div>
        <TopHeader title={"Mathew Ward"} />
        <div className={classes?.tabs}>
        <Tabs activeTab={SelectedTabs} setActiveTab={setSelectedTabs} tabs={coachTabs} />
        </div>
    </div>
  )
}

export default CoachDetailTemplate