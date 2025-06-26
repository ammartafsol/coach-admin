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
import { Loader } from "@/component/atoms/Loader";
import useDebounce from "@/resources/hooks/useDebounce";
import { Country } from "country-state-city";

import { USER_STATUS_OPTIONS } from "@/developmentContent/dropdownOption";
import RenderToast from "@/component/atoms/RenderToast";

const CoachDetailTemplate = ({ slug }) => {
  const [SelectedTabs, setSelectedTabs] = useState(coachTabs[0]);

  const { Get, Patch } = useAxios();
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [feedsData, setFeedsData] = useState([]);
  const [feedsLoading, setFeedsLoading] = useState("");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [feedsStatus, setFeedsStatus] = useState(USER_STATUS_OPTIONS[0]);
  const [feedsCategory, setFeedsCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Country selection state
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [subscribersData, setSubscribersData] = useState(null);

  // Get all countries for dropdown
  const countries = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.isoCode,
  }));

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

  const getSubscribersData = async (coachSlug = slug) => {
    const params = {
      coachSlug,
    };
    const query = new URLSearchParams(params).toString();

    setLoading(true);
    const { response } = await Get({
      route: `admin/coach/subscribers?${query}`,
    });

    console.log("subscribersData", response);
    if (response) {
      setSubscribersData(response.data);
    }
    setLoading(false);
  };

  const getData = async () => {
    setLoading(true);
    const { response } = await Get({
      route: `admin/users/${slug}`,
    });
    if (response) {
      setUsersData(response.data);
    }
    setLoading(false);
  };

  const getSubscribersData = async (coachSlug = slug) => {
    const params = {
      coachSlug,
    };
    const query = new URLSearchParams(params).toString();

    setLoading(true);
    const { response } = await Get({
      route: `admin/coach/subscribers?${query}`,
    });

    if (response) {
      setSubscribersData(response.data);
    }
    setLoading(false);
  };

  const getFeedsData = async ({
    _search = debounceSearch,
    _status = feedsStatus,
    _category = selectedCategory?._id,
  }) => {
    if (feedsLoading === "loading") return;

    const params = {
      coachSlug: slug,
      search: _search,
      ...(_status && { status: _status?.value }),
      ...(_category && { category: _category }),
    };
    const query = new URLSearchParams(params).toString();

    setFeedsLoading("loading");

    const { response } = await Get({
      route: `admin/feeds?${query}`,
    });

    if (response) {
      setFeedsData(response?.data);
    }
    setFeedsLoading("");
  };

  const editSubscription = async (values) => {
    setEditLoading(true);
    const { response } = await Patch({
      route: `admin/users/coach/subscription/update/${slug}`,
      data: {
        subscriptionCost: values.price,
      },
    });

    if (response) {
      setUsersData((prev) => ({
        ...prev,
        subscriptionCost: values.price,
      }));

      RenderToast({
        message: "Subscription updated successfully",
        type: "success",
      });
      return true;
    }
    setEditLoading(false);
  };

  const getCategoryData = async (coachSlug = slug) => {
    const params = {
      coachSlug,
      type: "feed",
    };
    const query = new URLSearchParams(params).toString();
    const { response } = await Get({
      route: `admin/categories?${query}`,
    });
    if (response) {
      const categories = response.data;
      setFeedsCategory(categories);
      if (categories.length > 0 && !selectedCategory) {
        setSelectedCategory(categories[0]);
      }
    }
    setLoading(false);
  };

  // Handle country change
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    getData();
    getSubscribersData();
    getCategoryData();
    if (SelectedTabs.value === "feeds") {
      getFeedsData({
        _search: debounceSearch,
        _status: feedsStatus,
        _category: selectedCategory?._id,
      });
    }
  }, [slug, debounceSearch, feedsStatus, selectedCategory, SelectedTabs.value]);

  return (
    <div>
      <TopHeader title={"coaches"} slug={`/${usersData?.fullName}`}></TopHeader>
      {loading ? (
        <div className={classes?.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <>
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <DropDown 
                  placeholder={"Location"} 
                  value={feedsCategory}
                  setValue={setFeedsCategory}
                /> */}
                <DropDown
                  placeholder={"Status"}
                  value={feedsStatus}
                  setValue={setFeedsStatus}
                  options={USER_STATUS_OPTIONS}
                />
              </div>
            ) : SelectedTabs.value === "users" ? (
              <div className={classes?.main}>
                <Input
                  mainContClassName={classes?.mainContClassName}
                  placeholder={"Search By Name"}
                  rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
                />
                <DropDown
                  placeholder={"Country"}
                  value={selectedCountry}
                  setValue={handleCountryChange}
                  options={countries}
                />
                <DropDown placeholder={"Status"} />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={classes?.coachTop}>
            {SelectedTabs.value === "users" ? (
              <UsersTable
                subscribersData={subscribersData}
                loading={loading}
                page={page}
                setPage={setPage}
                totalRecords={totalRecords}
              />
            ) : SelectedTabs.value === "users" ? (
              <UsersTable />
            ) : SelectedTabs.value === "profile" ? (
              <UserProfile userData={usersData} />
            ) : SelectedTabs.value === "subscription" ? (
              <Subscription
                editSubscription={editSubscription}
                userData={usersData}
                loading={editLoading}
              />
            ) : SelectedTabs.value === "feeds" ? (
              <FeedsCom
                feedsData={feedsData}
                setSearch={setSearch}
                setFeedsCategory={setSelectedCategory}
                feedsCategory={feedsCategory}
                loading={feedsLoading === "loading"}
              />
            ) : (
              "No data "
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoachDetailTemplate;
