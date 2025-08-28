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
import { useRouter } from "next/navigation";
import { RECORDS_LIMIT } from "@/const";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { Country } from "country-state-city";


const CoachesTemplate = () => {
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
  const [sortBy, setSortBy] = useState(SORT_BY_OPTIONS[0]); // Set "Descending" as default
  const [sortType, setSortType] = useState(SORT_TYPE_OPTIONS[0]); // Set "Created Date" as default
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  // Get all countries for dropdown
  const countries = Country.getAllCountries().map(country => ({
    label: country.name,
    value: country.isoCode
  }));

  const getSportCategories = async () => {
    const params = {
      type: "sport",
    };
    const query = new URLSearchParams(params).toString();
    const { response } = await Get({
      route: `admin/categories?${query}`,
    });
    if (response) {
      setCategories(response.data);
    }
  };

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
    getSportCategories();
  }, []);

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
  }, [debounceSearch, coachStatus, rating, country, sortBy, category]);

  // Separate useEffect for sort type and sort by combination
  useEffect(() => {
    if (sortType && sortBy) {
      getData({
        pg: 1,
        _search: debounceSearch,
        _coachStatus: coachStatus?.value,
        _rating: rating?.value,
        _country: country?.value,
        _sortBy: sortBy?.value,
        _sortType: sortType?.value,
        _category: category?.value,
      });
    }
  }, [sortType, sortBy]);

  const onClickPopover = (label = "", item = null) => {
    if (label === "Status") {
      setSelectedItem(item);
      setShowModal("areYouSure");
    } else if (label === "View Details") {
      router.push(`/coach/${item.slug}`);
    }
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

  const clearAllFilters = () => {
    setSearch("");
    setStatus(null);
    setCoachStatus(null);
    setRating(null);
    setCountry(null);
    setSortBy(SORT_BY_OPTIONS[0]);
    setSortType(SORT_TYPE_OPTIONS[0]);
    setCategory(null);
    setPage(1);
  };

  const hasActiveFilters = () => {
    return search || status || coachStatus || rating || country || 
           (sortBy && sortBy.value !== SORT_BY_OPTIONS[0].value) || 
           (sortType && sortType.value !== SORT_TYPE_OPTIONS[0].value) || 
           category;
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
                // Reset sort by when sort type changes
                setSortBy(null);
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
              disabled={!sortType}
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
           {hasActiveFilters() && (
             <button 
               className={classes.clearAllButton}
               onClick={clearAllFilters}
               type="button"
             >
               Clear
             </button>
           )}
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
                    popover={USER_ACTION_OPTIONS(rowItem)}
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

        {(showModal === "areYouSure") && (
          <AreYouSureModal
            show={showModal === "areYouSure"}
            setShow={setShowModal}
            heading={
              selectedItem?.isBlockedByAdmin
                ? "⚠️ Unblock Coach"
                : "⚠️ Block Coach"
            }
            subheading={
              `Are you sure you want to ${
                selectedItem?.isBlockedByAdmin ? "unblock" : "block"
              } this coach? This will ${
                selectedItem?.isBlockedByAdmin ? "restore" : "affect"
              } their access to the platform.`
            }
            confirmButtonLabel={
              loading === "updateStatus"
                ? "Submitting..."
                : "Confirm"
            }
            cancelButtonLabel="Cancel"
            confirmButtonVariant="danger"
            cancelButtonVariant="green-outlined"
            onConfirm={() => {
              if (selectedItem) {
                handleStatusChange(!selectedItem?.isBlockedByAdmin);
              }
            }}
          />
        )}
      </div>
    </>
  );
};

export default CoachesTemplate;
