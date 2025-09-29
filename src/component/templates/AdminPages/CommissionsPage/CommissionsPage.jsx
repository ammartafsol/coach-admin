"use client";
import TopHeader from "@/component/atoms/TopHeader";
import React, { useEffect, useState } from "react";
import classes from "./CommissionsPage.module.css";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { tableHeadersCommissiosData } from "@/developmentContent/tableHeader";
import ActionMenu from "@/component/molecules/ActionMenu/ActionMenu";
import useDebounce from "@/resources/hooks/useDebounce";
import { RECORDS_LIMIT } from "@/const";
import useAxios from "@/interceptor/axiosInterceptor";
import {
  EDIT_COMMISSION_OPTIONS,
  USER_ACTION_OPTIONS,
} from "@/developmentContent/dropdownOption";
import FilterHeader from "@/component/molecules/FilterHeader/FilterHeader";
import EditCommissionModal from "@/component/molecules/Modal/EditCommissionModal/EditCommissionModal";
import RenderToast from "@/component/atoms/RenderToast";

export default function CommissionsPage() {
  const { Get, Patch } = useAxios();

  const [showModal, setShowModal] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Edit Commission Modal states
  const [showEditCommissionModal, setShowEditCommissionModal] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [commissionLoading, setCommissionLoading] = useState(false);

  const getData = async ({ pg = page, _search = debounceSearch }) => {
    const params = {
      page: pg,
      search: _search,
      limit: RECORDS_LIMIT,
    };
    const query = new URLSearchParams(params).toString();

    setLoading("loading");

    const { response } = await Get({
      route: `admin/users/coach/all?${query}`,
    });
    if (response) {
      setData(response.data);
      setPage(pg);
      setTotalRecords(response?.totalRecords);
    }
    setLoading("");
  };

  // Handle commission update
  const handleCommissionUpdate = async (slug, newCommission) => {
    setCommissionLoading(true);
    try {
      const { response } = await Patch({
        route: `admin/users/coach/commission-update/${slug}`,
        data: {
          coachCommission: newCommission
        }
      });
      
      if (response) {
        // Update the local data
        setData(prevData => 
          prevData.map(item => 
            item.slug === slug 
              ? { ...item, coachCommission: newCommission }
              : item
          )
        );
        setShowEditCommissionModal(false);
        setSelectedCoach(null);
        RenderToast({
          type: "success",
          message: "Commission updated successfully"
        });
      }
    } catch (error) {
      console.error('Error updating commission:', error);
      RenderToast({
        type: "error",
        message: "Failed to update commission. Please try again."
      });
    } finally {
      setCommissionLoading(false);
    }
  };

  // Handle action menu clicks
  const handleActionClick = (item) => {
    setSelectedCoach(item);
    setShowEditCommissionModal(true);
    RenderToast({
      type: "info",
      message: `Editing commission for ${item.fullName}`
    });
  };

  useEffect(() => {
    getData({
      pg: 1,
      _search: debounceSearch,
    });
  }, [debounceSearch]);
  return (
    <>
      <TopHeader title="Commissions">
        <FilterHeader
          inputPlaceholder="Search By Name"
          searchValue={search}
          customStyle={{ width: "300px" }}
          onChange={(e) => {
            setSearch(e);
            setPage(1);
          }}
        />
      </TopHeader>
      <div>
        <AppTable
          tableHeader={tableHeadersCommissiosData}
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
              return <p className={classes.edit} onClick={() => handleActionClick(rowItem)}>Edit</p>
            }
            return item || "";
          }}
        />
      </div>

      {/* Edit Commission Modal */}
      <EditCommissionModal
        show={showEditCommissionModal}
        setShow={setShowEditCommissionModal}
        currentCommission={selectedCoach?.coachCommission}
        coachSlug={selectedCoach?.slug}
        onSave={handleCommissionUpdate}
        loading={commissionLoading}
      />
    </>
  );
}
