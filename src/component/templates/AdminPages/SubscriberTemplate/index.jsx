"use client";
import RenderToast from "@/component/atoms/RenderToast";
import TopHeader from "@/component/atoms/TopHeader";
import ActionMenu from "@/component/molecules/ActionMenu/ActionMenu";
import FilterHeader from "@/component/molecules/FilterHeader/FilterHeader";
import AreYouSureModal from "@/component/molecules/Modal/AreYouSureModal";
import RejectionReasonModal from "@/component/molecules/Modal/RejectionReasonModal";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { RECORDS_LIMIT } from "@/const";
import {
  USER_ACTION_OPTIONS,
  USER_STATUS_OPTIONS,
} from "@/developmentContent/dropdownOption";
import { tableUserHeaders } from "@/developmentContent/tableHeader";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./UserTemplate.module.css";

const SubscriberTemplate = () => {
  const { Patch, Get } = useAxios();

  const [showModal, setShowModal] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [totalRecords, setTotalRecords] = useState(0);
  const [status, setStatus] = useState(USER_STATUS_OPTIONS[0]);
  const [selectedItem, setSelectedItem] = useState(null);

  const router = useRouter();

  const getData = async ({
    pg = page,
    _search = debounceSearch,
    _role = "user",
    _status = status,
  }) => {
    if (loading === "loading") return;

    const params = {
      page: pg,
      search: _search,
      role: _role,
      limit: RECORDS_LIMIT,
      ...(_status && { status: _status?.value }),
    };
    const query = new URLSearchParams(params).toString();

    setLoading("loading");

    const { response } = await Get({
      route: `admin/users?${query}`,
    });

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
      _status: status,
    });
  }, [debounceSearch, status]);

  const onClickPopover = (label = "", item = null) => {
    if (label === "Status") {
      setSelectedItem(item);
      setShowModal("areYouSure");
    } else if (label == "View Details") {
      router.push(`/subscriber/${item.slug}`);
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
      route: `admin/users/status/${selectedItem?.slug}`,
      data: payload,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: `User updated successfully`,
      });
      const updatedUser = { ...selectedItem, isBlockedByAdmin: status };
      updateUserInList(updatedUser);
      setShowModal("");
    }
    setLoading("");
  };

  const handleStatusChange = async (status) => {
    setLoading("updateStatus");

    const { response } = await Patch({
      route: `admin/users/block-unblock/${selectedItem.slug}`,
      data: { status: status },
    });

    if (response) {
      RenderToast({
        type: "success",
        message: `User ${status ? "Blocked" : "Unblocked"} successfully`,
      });
      const updatedUser = { ...selectedItem, isBlockedByAdmin: status };
      updateUserInList(updatedUser);
      setShowModal("");
    }
    setLoading("");
  };

  const updateUserInList = (updatedUser) => {
    setData((prev) => {
      const filtered = prev.filter((u) => u.slug !== updatedUser.slug);
      return [updatedUser, ...filtered];
    });
  };

  return (
    <>
      <TopHeader title="Subscriber">
        <FilterHeader
          showDropDown={true}
          dropdownOption={USER_STATUS_OPTIONS}
          placeholder={"Status"}
          setValue={setStatus}
          value={status}
          inputPlaceholder="Search By Name"
          customStyle={{ width: "300px" }}
          onChange={(e) => {
            setSearch(e);
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

        {showModal === "coachStatus" && (
          <RejectionReasonModal
            show={showModal === "coachStatus"}
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
                  ? "⚠️ Active User"
                  : "⚠️ Inactive User"
                : "Approve User"
            }
            subheading={
              showModal === "areYouSure"
                ? `Are you sure you want to ${
                    selectedItem?.isBlockedByAdmin ? "active" : "inactive"
                  } this user? This will ${
                    selectedItem?.isBlockedByAdmin ? "restore" : "affect"
                  } their access to the platform.`
                : "Are you sure you want to approve this user?"
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

export default SubscriberTemplate;
