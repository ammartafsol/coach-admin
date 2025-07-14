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
import { mediaUrl } from "@/resources/utils/helper";
import { Loader } from "@/component/atoms/Loader";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const DashboardTemplate = () => {
  const { Get } = useAxios();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [coachesTableData, setCoachesTableData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartLoading, setChartLoading] = useState(false);

  const formatCoachesData = (coaches = []) =>
    coaches.map((coach) => ({
      coachName: coach.fullName || "",
      email: coach.email || "",
      slug: coach.slug || "",
      phoneNumber: coach.phoneNumber || "",
      city: coach.city || "",
      totalSubscriber: coach.noOfSubscribers ?? 0,
      photo: coach.photo || null,
    }));

  const getData = async (year = selectedYear) => {
    setLoading(true);

    const params = {
      forYear: year.toString(),
    };
    const query = new URLSearchParams(params).toString();

    const { response } = await Get({
      route: `admin/dashboard?${query}`,
    });

    if (response) {
      console.log("🚀 ~ getData ~ response:", response);
      setData(response.data);
      setCoachesTableData(formatCoachesData(response.data?.coaches));
    }
    setLoading(false);
  };

  // Separate function to fetch only graph data
  const getGraphData = async (year) => {
    setChartLoading(true);
    
    const params = {
      forYear: year.toString(),
      graph: "graph"
    };
    const query = new URLSearchParams(params).toString();

    const { response } = await Get({
      route: `admin/dashboard?${query}`,
    });

    if (response) {
      console.log("🚀 ~ getGraphData ~ response:", response);
      // Update only the graph data in the existing data state
      // Ensure we always pass an array, even if empty
      const graphData = response.data?.graph || [];
      setData(prevData => ({
        ...prevData,
        graph: graphData
      }));
    } else {
      // If no response, set empty array to show no data
      setData(prevData => ({
        ...prevData,
        graph: []
      }));
    }
    setChartLoading(false);
  };

  // Handle year change for chart data
  const handleYearChange = (year) => {
    setSelectedYear(year);
    getGraphData(year);
  };

  // Wrapper function for DashboardRightContent to refresh data with current year
  const refreshData = () => {
    getData(selectedYear);
  };

  useEffect(() => {
    getData(new Date().getFullYear());
  }, []);

  if (loading) {
    return (
      <div className={classes.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <StatsCards statsData={data?.stats} />
      <div className={classes.contentRow}>
        <div className={classes.leftColumn}>
          <EarningsChart 
            data={data?.graph} 
            onYearChange={handleYearChange}
            loading={chartLoading}
          />
          <BorderWrapper className={classes?.bordetop}>
            <div className={classes?.topHeader}>
              <h4>Coaches</h4>
              <div>
                <Link href={"/coach"} className={classes.seeAllLink}>
                  <span>View All Coaches</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
            <AppTable
              tableHeader={tableHeaders}
              data={coachesTableData}
              renderItem={({ item, key, rowIndex, renderValue }) => {
                const rowItem = coachesTableData[rowIndex];
                if (renderValue) {
                  return renderValue(item, rowItem);
                }
                return item || "";
              }}
            />
          </BorderWrapper>
        </div>
        <div className={classes.rightColumn}>
          <DashboardRightContent
            dataSubscribers={data?.stats}
            dataFeeds={data?.feeds}
            dataRequests={data?.requestCoaches}
            getData={refreshData}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
