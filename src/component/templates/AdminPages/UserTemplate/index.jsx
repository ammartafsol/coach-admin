"use client";
import React, { useState, useEffect } from "react";
import classes from "./UserTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { tableUserHeaders } from "@/developmentContent/tableHeader";
import ActionMenu from "@/component/molecules/ActionMenu/ActionMenu";
import {
  COACH_STATUS_OPTIONS,
  USER_ACTION_OPTIONS,
  USER_STATUS_OPTIONS,
} from "@/developmentContent/dropdownOption";
import { USER_ROLE_TABS_DATA } from "@/developmentContent/tabsData";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import RenderToast from "@/component/atoms/RenderToast";
import FilterHeader from "@/component/molecules/FilterHeader/FilterHeader";
import AreYouSureModal from "@/component/molecules/Modal/AreYouSureModal";

const UserTemplate = () => {
  const { Patch, Get } = useAxios();
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [acceptingId, setAcceptingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [totalRecords, setTotalRecords] = useState(data?.length ?? 0);
  const [status, setStatus] = useState(USER_STATUS_OPTIONS[1]);
  const [coachStatus, setCoachStatus] = useState(COACH_STATUS_OPTIONS[0]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [role, setRole] = useState(USER_ROLE_TABS_DATA[0].value);

  const getData = async ({
    pg = page,
    _search = debounceSearch,
    _coachStatus = coachStatus?.value,
    _role = role,
    _status = status?.value,
  }) => {
    if (loading === "loading") return;
    const params = {
      page: pg,
      search: _search,
      coachStatus: _coachStatus,
      role: _role,
      status: _status,  
    };
    const query = new URLSearchParams(params).toString();
    setLoading("loading");
    const { response } = await Get({
      route: `admin/users?${query}&limit=10`,
    });
    if (response) {
      setData(response.data);
      setPage(pg);
      setTotalRecords(response.totalRecords);
    }
    setLoading("");
  };

  useEffect(() => {
    getData({
      _search: debounceSearch,
      _coachStatus: coachStatus?.value,
      role: role,
      status: status?.value
    });
  }, [
    debounceSearch,
    page,
    coachStatus,
    role,
    status
  ]);

  const onClickPopover = (label = "", item = null) => {
    if (label === "Status") {
      setSelectedItem(item);
      setShowAreYouSureModal(true);
    }
  };

  const handleCoachStatusChange = async (
    itemData,
    status,
    rejectionReason = ""
  ) => {
    if (!itemData?._id || !status) return;

    if (status === "approved") {
      setAcceptingId(itemData._id);
    } else if (status === "rejected") {
      setRejectingId(itemData._id);
    }

    const payload = { status };
    if (status === "rejected") {
      let reasonText = "";
      if (typeof rejectionReason === "string") {
        reasonText = rejectionReason.trim();
      } else if (rejectionReason && typeof rejectionReason === "object") {
        reasonText = (rejectionReason.rejectReason || "").trim();
      }
      
      payload.rejectionReason = reasonText;
      if (!payload.rejectionReason) {
        RenderToast({
          type: "error",
          message: "Rejection Reason is required",
        });
        return;
      }
    }

    const { response } = await Patch({
      route: `admin/users/coach/status/${itemData.slug}`,
      data: payload,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: `User ${status} successfully`,
      });
      getData({
        _search: debounceSearch,
        _coachStatus: coachStatus?.value,
        role,
      });
      setLoading("");
    }
    setAcceptingId(null);
    setRejectingId(null);
  };

  const handleStatusChange = async (itemData, statusObj) => {
    setLoading("loading");
    if (!itemData?._id || !statusObj) return;
    
    const statusValue = statusObj.value; 
    
    const { response } = await Patch({
      route: `admin/users/block-unblock/${itemData.slug}`,
      data: { status: statusValue },
    });
  
    if (response) {
      const statusText = statusValue ? "blocked" : "unblocked";
      RenderToast({
        type: "success",
        message: `User ${statusText} successfully`,
      });
      setLoading("");
      
      getData({
        _search: debounceSearch,
        _coachStatus: coachStatus?.value,
        role,
        status: status?.value
      });
    } else {
      setLoading("");
    }
  }

  return (
    <>
      <TopHeader
        title="User"
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
            if (key === "action") {
              const isPending = rowItem?.status === "pending";

              return (
                <div className={classes.actionButtons}>
                  <ActionMenu
                    popover={USER_ACTION_OPTIONS}
                    onClick={(label) => {
                      onClickPopover(label, rowItem);
                    }}
                    showButtons={isPending}
                    itemData={rowItem}
                    onAccept={() =>
                      handleCoachStatusChange(rowItem, "approved")
                    }
                    onReject={(reason) =>
                      handleCoachStatusChange(rowItem, "rejected", reason)
                    }
                    acceptLoading={acceptingId === rowItem._id}
                    rejectLoading={rejectingId === rowItem._id}
                  />
                </div>
              );
            }
            return item || "";
          }}
        />
        {showAreYouSureModal && (
          <AreYouSureModal
            show={showAreYouSureModal}
            setShow={() => {
              setShowAreYouSureModal(false);
              setSelectedItem(null);
            }}
            heading={selectedItem?.isBlockedByAdmin ? "⚠️ Unblock User" : "⚠️ Block User"}
            subheading={
              selectedItem?.isBlockedByAdmin 
                ? "Are you sure you want to unblock this user? This will restore their access to the platform."
                : "Are you sure you want to block this user? This action will affect their access to the platform."
            }
            confirmButtonLabel={selectedItem?.isBlockedByAdmin ? "Unblock" : "Block"}
            cancelButtonLabel="Cancel"
            confirmButtonVariant="danger"
            cancelButtonVariant="green-outlined"
            onConfirm={() => {
              if (selectedItem) {
                const newStatus = selectedItem.isBlockedByAdmin ? false : true;
                handleStatusChange(selectedItem, { value: newStatus });
              }
            }}
          />
        )}
      </div>
    </>
  );
};

export default UserTemplate;
