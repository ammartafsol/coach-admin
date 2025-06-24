"use client";
import React, { useEffect, useState } from "react";
import classes from "./DashboardTemplate.module.css";
import StatsCards from "@/component/molecules/StatsCards";
import DashboardRightContent from "@/component/molecules/DashboardRightContent";
import EarningsChart from "@/component/molecules/Chart";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { tableHeaders } from "@/developmentContent/tableHeader";
import { CoachTableBody } from "@/developmentContent/tableBody";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import { RiArrowDropRightLine } from "react-icons/ri";
import Image from "next/image";
import useAxios from "@/interceptor/axiosInterceptor";

const DashboardTemplate = () => {
  const { Get } = useAxios();

  const [loading, setLoading] = useState("");
  const [data, setData] = useState(null);

  const getData = async () => {
    setLoading("loading");

    const { response } = await Get({
      route: `admin/dashboard`,
    });

    if (response) {
      console.log("🚀 ~ getData ~ response:", response);
      setData(response.data);
    }

    setLoading("");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <StatsCards statsData={data?.stats} />
      <div className={classes.contentRow}>
        <div className={classes.leftColumn}>
          <EarningsChart />
          <BorderWrapper className={classes?.bordetop}>
            <div className={classes?.topHeader}>
              <h4>Coaches</h4>
              <div>
                <span>View All Coaches</span>
                <RiArrowDropRightLine
                  cursor={"pointer"}
                  color="#64832D"
                  size={26}
                />
              </div>
            </div>
            <AppTable
              tableHeader={tableHeaders}
              data={CoachTableBody}
              renderItem={({ item, key, rowIndex, renderValue }) => {
                const rowItem = CoachTableBody[rowIndex];
                if (renderValue) {
                  return renderValue(item, rowItem);
                }
                if (key === "coachName") {
                  return (
                    <div className={classes?.profileParent}>
                      <div className={classes?.profile}>
                        <Image
                          src={"/images/cms-images/profile.png"}
                          fill
                          alt="profile"
                        />
                      </div>
                      <div className={classes?.userName}>Jenny Wilson</div>
                    </div>
                  );
                }
                if (key == "action") {
                  return (
                    <HiOutlineDotsHorizontal
                      size={25}
                      className={classes.actionLink}
                      onClick={() => router.push("/merchant/product/1")}
                    />
                  );
                }
                return item || "";
              }}
            />
          </BorderWrapper>
        </div>
        <div className={classes.rightColumn}>
          <DashboardRightContent />
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
