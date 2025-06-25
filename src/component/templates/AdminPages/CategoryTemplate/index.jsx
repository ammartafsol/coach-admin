"use client";
import TopHeader from "@/component/atoms/TopHeader";
import ActionMenu from "@/component/molecules/ActionMenu/ActionMenu";
import AddCategoryModal from "@/component/molecules/Modal/AddCategory";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { CATEGORY_ACTION_OPTIONS, CATEGORY_FILTER_OPTIONS, STATUS_OPTIONS } from "@/developmentContent/dropdownOption";
import { categoryTableHeaders } from "@/developmentContent/tableHeader";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import { useEffect, useState } from "react";
import classes from "./CategoryTemplate.module.css";
import { CreateFormData } from "@/resources/utils/helper";
import RenderToast from "@/component/atoms/RenderToast";
import FilterHeader from "@/component/molecules/FilterHeader/FilterHeader";
import { RECORDS_LIMIT } from "@/const";

const CategoryTemplate = () => {
  const { Post, Patch , Get} = useAxios();
  
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(CATEGORY_FILTER_OPTIONS[0]);
  const debounceSearch = useDebounce(search, 500);

  const [totalRecords, setTotalRecords] = useState(0);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [selectedItem, setSelectedItem] = useState(null);
 
  const getData = async ({
    pg = page,
    _search = debounceSearch,
    _status = status,
    type = type,
  }) => {
    if (loading === "loading") return;

    const params = {
      page: pg,
      search: _search,
      ...(_status && { status: _status?.value }),
      limit: RECORDS_LIMIT,
      ...(type && { type: type?.value }),

    };
    const query = new URLSearchParams(params).toString();
    console.log(query);

    setLoading("loading");

    const { response } = await Get({
      route: `admin/categories?${query}`,
    });

    if (response) {
      setData(response?.data);
      setPage(pg);
      setTotalRecords(response?.totalRecords);
    }

    setLoading("");
  };

  useEffect(() => {
    getData({pg: 1, _search: debounceSearch, _status: status, type: type });

  }, [debounceSearch ,status, type]);


  const onClickPopover = (label = "", item = rowItem) => {
    if(label === "Edit"){
      setSelectedItem(item);
      setShowModal(true);
    }
  };


  // add/edit category
  const handleAddEditCategory = async (values) => {

    if(!values) return;

    setLoading("addEditCategory");

    const payload = {
      ...values,
      type: values.type?.value,
      isActive: values.isActive?.value,
    };

    const route = selectedItem?.slug
      ? `admin/categories/${selectedItem?.slug}`
      : "admin/categories";

    const responseHandler = selectedItem?.slug ? Patch : Post;

    const { response } = await responseHandler({
      route,
      data: payload,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: `Category ${selectedItem?.slug ? "Updated" : "Added"} Successfully.`
      });
      setShowModal(false);
      getData({ pg: 1 });
    }
    setLoading("");
  };

  const handleImageChange = async (file) => {

    if(!file) return;

    const data = {
      media: file,
    };

    const formData = CreateFormData(data);

    setLoading("uploadImage");

    const { response } = await Post({
      route: "media/upload",
      data: formData,
      isFormData: true,
    });

    if (response) {
      setSelectedItem({
        ...selectedItem,
        image: response?.data?.media[0]?.key,
      });
    }
    setLoading("");
  };

  return (
    <main>
      <TopHeader title="Category">
        <FilterHeader
          showDropDown={true}
          dropdownOption={STATUS_OPTIONS}
          placeholder={"Status"}
          setValue={(value) => {
            setStatus(value);
          }}
          inputPlaceholder="Search"
          customStyle={{ width: "300px" }}
          onChange={(e) => {
            setSearch(e);
          }}
          secondDropdownOption  ={CATEGORY_FILTER_OPTIONS}
          secondPlaceholder={"Type"}
          setSecondValue={(value) => {
            setType(value);
          }}
          secondValue={type}
          showButton={true}
          buttonLabel="Add Category"
          buttonOnClick={() => {
            setSelectedItem(null);
            setShowModal(true);
          }}
        />
      </TopHeader>
      <div>
        <AppTable
          tableHeader={categoryTableHeaders}
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
                      popover={CATEGORY_ACTION_OPTIONS}
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
        <AddCategoryModal
          show={showModal}
          setShow={setShowModal}
          itemData={selectedItem}
          handleAddEditCategory={handleAddEditCategory}
          handleImageChange={handleImageChange}
          loading={loading === "addEditCategory" || loading === "uploadImage"}
         
        />
      )}
    </main>
  );
};

export default CategoryTemplate;
