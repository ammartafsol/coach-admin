"use client";
import TopHeader from "@/component/atoms/TopHeader";
import ActionMenu from "@/component/molecules/ActionMenu/ActionMenu";
import AddFaqModal from "@/component/molecules/Modal/AddFaq";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { FAQ_ACTION_OPTIONS, STATUS_OPTIONS } from "@/developmentContent/dropdownOption";
import { faqTableHeaders } from "@/developmentContent/tableHeader";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import { useEffect, useState } from "react";
import classes from "./FaqTemplate.module.css";
import RenderToast from "@/component/atoms/RenderToast";
import FilterHeader from "@/component/molecules/FilterHeader/FilterHeader";

const FaqTemplate = () => {
  const { Post, Patch, Get, Delete } = useAxios();
  
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [totalRecords, setTotalRecords] = useState(data?.length ?? 0);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [selectedItem, setSelectedItem] = useState(null);
 
  const getData = async ({
    pg = page,
    _search = debounceSearch,
    _status = status?.value,
  }) => {
    if (loading === "loading") return;

    const params = {
      page: pg,
      search: _search,
      status: _status,
    };
    const query = new URLSearchParams(params).toString();

    setLoading("loading");

    const { response } = await Get({
      route: `admin/faqs?${query}&limit=10`,
    });

    if (response) {
      setData(response.data);
      setPage(pg);
      setTotalRecords(response.totalRecords);
    }

    setLoading("");
  };

  useEffect(() => {
    getData({ _search: debounceSearch, _status: status?.value });
  }, [debounceSearch, page, status]);

    const handleDeleteFaq = async (values) => {
    setLoading("deleting");

    const { response } = await Delete({
      route: `admin/faqs/${values.slug}`,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: "FAQ Deleted Successfully"
      });

      setLoading("");
      getData({ _search: debounceSearch, _status: status?.value });
    }
  };

  const onClickPopover = (label = "", item = rowItem) => {
    if(label === "Edit"){
      setSelectedItem(item);
      setTimeout(() => {
        setShowModal(true);
      }, 0);
    }
    if(label === "Delete"){
      setSelectedItem(item);
      handleDeleteFaq(item);
    }
  };

  // add/edit faq
  const handleAddEditFaq = async (values) => {
    setLoading("loading");

    const payload = {
      ...values,
      isActive: values.isActive?.value,
      type: values.type?.value,
    };

    const route = selectedItem?._id
      ? `admin/faqs/${selectedItem.slug}`
      : "admin/faqs";
    const responseHandler = selectedItem?.slug ? Patch : Post;

    const { response } = await responseHandler({
      route,
      data: payload,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: selectedItem?.slug
          ? "FAQ Updated Successfully"
          : "FAQ Added Successfully",
      });
      setShowModal(false);
      setLoading("");
      getData({ _search: debounceSearch, _status: status?.value });
    }
  };

  return (
    <main>
      <TopHeader title="FAQ Management">
        <FilterHeader
          showDropDown={true}
          dropdownOption={STATUS_OPTIONS}
          placeholder={"Status"}
          setValue={(value) => {
            setStatus(value);
            setPage(1);
          }}
          inputPlaceholder="Search"
          customStyle={{ width: "300px" }}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          showButton={true}
          buttonLabel="Add FAQ"
          buttonOnClick={() => {
            setSelectedItem(null);
            setShowModal(true);
          }}
        />
      </TopHeader>
      <div>
        <AppTable
          tableHeader={faqTableHeaders}
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
            if (renderValue) return renderValue(rowItem[key]);
            if (key === "action") {
              return (
                <div className={classes.actionButtons}>
                    <ActionMenu
                      popover={FAQ_ACTION_OPTIONS}
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
      </div>
      {showModal && (
        <AddFaqModal
          show={showModal}
          setShow={() => {
            setShowModal(false);
            setSelectedItem(null);
          }}
          itemData={selectedItem}
          handleAddEditFaq={handleAddEditFaq}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </main>
  );
};

export default FaqTemplate; 