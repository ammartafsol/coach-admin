"use client";
import React, { useState, useEffect } from "react";
import classes from "./CoachesTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import AppTable from "@/component/organisms/AppTable/AppTable";
import {
  tableHeadersData,
} from "@/developmentContent/tableHeader";
import ActionMenu from "@/component/molecules/ActionMenu/ActionMenu";
import {
  COACH_STATUS_OPTIONS,
  COACH_RATING_OPTIONS,
  USER_ACTION_OPTIONS,
  SORT_BY_OPTIONS,
  SORT_TYPE_OPTIONS,
} from "@/developmentContent/dropdownOption";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import RenderToast from "@/component/atoms/RenderToast";
import FilterHeader from "@/component/molecules/FilterHeader/FilterHeader";
import AreYouSureModal from "@/component/molecules/Modal/AreYouSureModal";
import RejectionReasonModal from "@/component/molecules/Modal/RejectionReasonModal";
import { useRouter } from "next/navigation";
import { RECORDS_LIMIT } from "@/const";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { Country } from "country-state-city";
import { useSelector } from "react-redux";

const CoachesTemplate = () => {
  const categories = useSelector((state) => state.category.categories);
  console.log("categories redux",categories);  
  const { Patch, Get } = useAxios();

  const [showModal, setShowModal] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [totalRecords, setTotalRecords] = useState(0);
  const [status, setStatus] = useState(null);
  const [coachStatus, setCoachStatus] = useState(null);
  const [rating, setRating] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [country, setCountry] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortType, setSortType] = useState(null);
  const [category, setCategory] = useState(null);

  const router = useRouter();

  // Get all countries for dropdown
  const countries = Country.getAllCountries().map(country => ({
    label: country.name,
    value: country.name
  }));

  const getData = async ({
    pg = page,
    _search = debounceSearch,
    _coachStatus = coachStatus?.value,
    _role = "coach",
    // _status = status,
    _rating = rating?.value,
    _country = country?.value,
    _sortBy = sortBy?.value,
    _sortType = sortType?.value,
    _category = category?.value,
  }) => {
    if (loading === "loading") return;

    const params = {
      page: pg,
      search: _search,
      role: _role,
      limit: RECORDS_LIMIT,
    };

    // Only add filters if they have values
    if (_coachStatus && _coachStatus !== "all") {
      params.coachStatus = _coachStatus;
    }
    // if (_status && _status.value && _status.value !== "all") {
    //   params.status = _status.value;
    // }
    if (_rating && _rating !== "all") {
      params.rating = _rating;
    }
    if (_country) {
      params.country = _country;
    }
    if (_category) {
      params.category = _category;
    }
    if (_sortType && _sortBy) {
      params.sortType = _sortType;
      params.sortBy = _sortBy;
    }

    const query = new URLSearchParams(params).toString();

    setLoading("loading");
    console.log(query);

    const { response } = await Get({
      route: `admin/users?${query}`,
    });

    console.log(response);
    if (response) {
      setData(response?.data);
      setPage(pg);
      setTotalRecords(response?.totalRecords);
    }

    setLoading("");
  };

  useEffect(() => {
    getData({
      pg: 1,
      _search: debounceSearch,
      _coachStatus: coachStatus?.value,
      // _status: status,
      _rating: rating?.value,
      _country: country?.value,
      _sortBy: sortBy?.value,
      _sortType: sortType?.value,
      _category: category?.value,
    });
  }, [debounceSearch, coachStatus, rating, country, sortBy, sortType, category]);

  const onClickPopover = (label = "", item = null) => {
    if (label === "Status") {
      setSelectedItem(item);
      setShowModal("areYouSure");
    } else if (label === "View Details") {
      router.push(`/coach/${item.slug}`);
    } else if (label === "Accept" || label === "Reject") {
      setShowModal(label === "Accept" ? "accept" : "reject");
      setSelectedItem(item);
    }
  };

  const handleCoachStatus = async (values) => {
    setLoading("coachStatus");

    const payload = {
      status: showModal === "accept" ? "approved" : "rejected",
      ...(values && { rejectionReason: values.rejectReason }),
    };

    const { response } = await Patch({
      route: `admin/users/coach/status/${selectedItem?.slug}`,
      data: payload,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: `Coach ${
          showModal === "accept" ? "approved" : "rejected"
        } successfully`,
      });
      const updatedCoach = { ...selectedItem,  status: showModal === "accept" ? "approved" : "rejected" };
      updateCoachInList(updatedCoach);
      setShowModal("");
    }
    setLoading("");
  };

  const handleStatusChange = async (status) => {
    setLoading("updateStatus");

    // if (!status) return;

    const { response } = await Patch({
      route: `admin/users/block-unblock/${selectedItem.slug}`,
      data: { status: status },
    });

    if (response) {
      RenderToast({
        type: "success",
        message: `Coach ${status ? "Blocked" : "Unblocked"} successfully`,
      });
      const updatedCoach = { ...selectedItem, isBlockedByAdmin: status };
      updateCoachInList(updatedCoach);
      setShowModal("");
    }
    setLoading("");
  };

  const updateCoachInList = (updatedCoach) => {
    setData((prev) => {
      const filtered = prev.filter((u) => u.slug !== updatedCoach.slug);
      return [updatedCoach, ...filtered];
    });
  };

  return (
    <>
      <TopHeader title="Coaches">
        <FilterHeader
          showDropDown={true}
          dropdownOption={COACH_RATING_OPTIONS}
          placeholder={"Rating"}
          setValue={(value) => {
            setRating(value);
            setPage(1);
          }}
          value={rating}
          // secondDropdownOption={USER_STATUS_OPTIONS}
          // secondPlaceholder={"Status"}
          // setSecondValue={(value) => {
          //   setStatus(value);
          //   setPage(1);
          // }}
          // secondValue={status}
          inputPlaceholder="Search By Name"
          customStyle={{ width: "300px" }}
          onChange={(e) => {
            setSearch(e);
            setPage(1);
          }}
        >
          <div className={classes.filterHeader}>
            <DropDown
              options={COACH_STATUS_OPTIONS}
              placeholder={"Status"}
              value={coachStatus}
              setValue={setCoachStatus}
            />
            <DropDown
              options={countries}
              placeholder={"Country"}
              value={country}
              setValue={(value) => {
                setCountry(value);
                setPage(1);
              }}
            />
            <DropDown
              options={SORT_TYPE_OPTIONS}
              placeholder={"Sort Type"}
              value={sortType}
              setValue={(value) => {
                setSortType(value);
                setPage(1);
              }}
            />
            <DropDown
              options={SORT_BY_OPTIONS}
              placeholder={"Sort By"}
              value={sortBy}
              setValue={(value) => {
                setSortBy(value);
                setPage(1);
              }}
            />
            <DropDown
              options={(categories || []).map((category) => ({
                label: category.name,
                value: category._id,
              }))}
              placeholder={"Category"}
              value={category}
              setValue={(value) => {
                setCategory(value);
                setPage(1);
              }}
            />
          </div>
        </FilterHeader>
      </TopHeader>
      <div>
        <AppTable
          tableHeader={tableHeadersData}
          data={data}
          hasPagination={true}
          loading={loading === "loading"}
          totalItems={totalRecords}
          onPageChange={(p) => {
            setPage(p);
            getData({ pg: p });
          }}
          currentPage={page}
          renderItem={({ item, key, rowIndex, renderValue }) => {
            const rowItem = data[rowIndex];
            if (renderValue) return renderValue(item, rowItem);
            if (key === "action") {
              return (
                <div className={classes.actionButtons}>
                  <ActionMenu
                    popover={USER_ACTION_OPTIONS(rowItem?.status)}
                    onClick={(label) => {
                      onClickPopover(label, rowItem);
                    }}
                    itemData={rowItem}
                  />
                </div>
              );
            }
            return item || "";
          }}
        />

        {showModal === "reject" && (
          <RejectionReasonModal
            show={showModal === "reject"}
            setShow={setShowModal}
            onConfirm={handleCoachStatus}
            loading={loading === "coachStatus"}
          />
        )}

        {(showModal === "areYouSure" || showModal === "accept") && (
          <AreYouSureModal
            show={showModal === "areYouSure" || showModal === "accept"}
            setShow={setShowModal}
            heading={
              showModal === "areYouSure"
                ? selectedItem?.isBlockedByAdmin
                  ? "⚠️ Unblock Coach"
                  : "⚠️ Block Coach"
                : "Approve Coach"
            }
            subheading={
              showModal === "areYouSure"
                ? `Are you sure you want to ${
                    selectedItem?.isBlockedByAdmin ? "unblock" : "block"
                  } this coach? This will ${
                    selectedItem?.isBlockedByAdmin ? "restore" : "affect"
                  } their access to the platform.`
                : "Are you sure you want to approve this coach?"
            }
            confirmButtonLabel={
              ["coachStatus", "updateStatus"].includes(loading)
                ? "Submitting..."
                : "Confirm"
            }
            cancelButtonLabel="Cancel"
            confirmButtonVariant="danger"
            cancelButtonVariant="green-outlined"
            onConfirm={() => {
              if (selectedItem) {
                if (showModal === "areYouSure") {
                  handleStatusChange(!selectedItem?.isBlockedByAdmin);
                } else {
                  handleCoachStatus();
                }
              }
            }}
          />
        )}
      </div>
    </>
  );
};

export default CoachesTemplate;
