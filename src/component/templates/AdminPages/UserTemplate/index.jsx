"use client";
import React, { useState, useEffect } from "react";
import classes from "./UserTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import { Input } from "@/component/atoms/Input";
import { IoSearchOutline } from "react-icons/io5";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  tableHeaders,
  tableUserHeaders,
} from "@/developmentContent/tableHeader";
import { CoachTableBody, tableUserData } from "@/developmentContent/tableBody";
import ActionMenu from "@/component/molecules/ActionMenu/ActionMenu";
import { useRouter } from "next/navigation";
import { COACH_STATUS_OPTIONS, USER_ACTION_OPTIONS, USER_STATUS_OPTIONS } from "@/developmentContent/dropdownOption";
import { USER_ROLE_TABS_DATA } from "@/developmentContent/tabsData";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import RenderToast from "@/component/atoms/RenderToast";
import FilterHeader from "@/component/molecules/FilterHeader/FilterHeader";
import AddUserModal from "@/component/molecules/Modal/AddUser";
import Image from "next/image";

const UserTemplate = () => {
  const { Patch, Get } = useAxios();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [totalRecords, setTotalRecords] = useState(data?.length ?? 0);
  const [status, setStatus] = useState(USER_STATUS_OPTIONS[0]);
  const [coachStatus, setCoachStatus] = useState(COACH_STATUS_OPTIONS[0]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [role, setRole] = useState(USER_ROLE_TABS_DATA[0].value);
  const router = useRouter();

  const getData = async ({
    pg = page,
    _search = debounceSearch,
    _coachStatus = coachStatus?.value,
    role = role,
    status = status?.value,
  }) => {
    if (loading === "loading") return;
    const params = {
      page: pg,
      search: _search,
      coachStatus: _coachStatus,
      role: role,
      status: status,
    };
    const query = new URLSearchParams(params).toString();
    console.log("query", query);
    setLoading("loading");
    const { response } = await Get({
      // route: `admin/users?role=${role}&limit=10`,
      route: `admin/users?${query}&limit=10`,
    });
    console.log(response);
    if (response) {
      setData(response.data);
      setPage(pg);
      setTotalRecords(response.totalRecords);
    }
    setLoading("");
  };

  useEffect(() => {
    getData({ _search: debounceSearch, _coachStatus: coachStatus?.value,  role: role, status: status?.value });
  }, [debounceSearch, page, coachStatus, role, status]);

  const onClickPopover = (label = "", item = null) => {
    if (label === "Edit") {
      setSelectedItem(item);
      setTimeout(() => {
        setShowModal(true);
      }, 0);
    }
    if (label === "View Detail") {
      router.push(`/user/${item?._id}`);
    }
    if (label === "Deactivate") {
      // Implement deactivate logic here
    }
  };

  // edit user
  const handleAddEditUser = async (values) => {
    setLoading("loading");
    const payload = {
      ...values,
      isActive: values.isActive?.value,
    };
    const route = selectedItem?._id ? `admin/users/${selectedItem._id}` : null;
    if (!route) return;
    const { response } = await Patch({
      route,
      data: payload,
    });
    if (response) {
      RenderToast({
        type: "success",
        message: "User Updated Successfully",
      });
      setShowModal(false);
      setLoading("");
      getData({ _search: debounceSearch, _coachStatus: coachStatus?.value, role: role, status: status?.value });
    }
  };

  return (
    <>
      <TopHeader title="User"
      tabsData={USER_ROLE_TABS_DATA}
      selected={role}
      setSelected={(value) => {
        setRole(value);
        setPage(1);
      }}
      >
        <FilterHeader
          dropdownOption={COACH_STATUS_OPTIONS}
          placeholder={"Status"}
          setValue={(value) => {
            setCoachStatus(value);
            setPage(1);
          }}
          

          inputPlaceholder="Search By Name"
          customStyle={{ width: "300px" }}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}

        />
      </TopHeader>
      <div>
        <AppTable
          tableHeader={tableUserHeaders}
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
            if (key === "username") {
              return (
                <div className={classes?.profileParent}>
                  <div className={classes?.profile}>
                    <Image
                      src={rowItem?.image || "/images/cms-images/profile.png"}
                      fill
                      alt="profile"
                    />
                  </div>
                  <div className={classes?.userName}>{rowItem?.firstName} {rowItem?.lastName}</div>
                </div>
              );
            }
            if (key === "action") {
              return (
                <div className={classes.actionButtons}>
                  <ActionMenu
                    popover={USER_ACTION_OPTIONS}
                    onClick={(label) => {
                      onClickPopover(label, rowItem);
                    }}
                  />
                </div>
              );
            }
            return item || "";
          }}
        />
        {showModal && (
          <AddUserModal
            show={showModal}
            setShow={() => {
              setShowModal(false);
              setSelectedItem(null);
            }}
            itemData={selectedItem}
            handleAddEditUser={handleAddEditUser}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
    </>
  );
};

export default UserTemplate;
