"use client";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import TopHeader from "@/component/atoms/TopHeader";
import ActionMenu from "@/component/molecules/ActionMenu/ActionMenu";
import DropDown from "@/component/molecules/DropDown/DropDown";
import AddCategoryModal from "@/component/molecules/Modal/AddCategory";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { STATUS_OPTIONS } from "@/developmentContent/dropdownOption";
import {
  categoryTableHeaders,
} from "@/developmentContent/tableHeader";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import classes from "./CategoryTemplate.module.css";

const CategoryTemplate = () => {

  const { Get } = useAxios();
  
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [totalRecords, setTotalRecords] = useState(data?.length ?? 0);
  const [status, setStatus] = useState(STATUS_OPTIONS[0]);
  const [selectedItem, setSelectedItem] = useState(null);

  // STATUS_OPTIONS[0]\
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);


  const getData = async ({ pg = page, _search = debounceSearch, _status = status?.value }) => {
    if (loading === "loading") return;

    const params = {
      page: pg,
      search: _search,
      isActive: _status,
    };
    const query = new URLSearchParams(params).toString();

    setLoading("loading");
  
    const {response} = await Get({
      route: `admin/categories?${query}&limit=10`,
    });

    if (response) {
      setData(response.data);
      setPage(pg);
      setTotalRecords(response.totalRecords);
    }
  
    setLoading("");
  };

  useEffect(() => {
    getData({  _search: debounceSearch , _status: status?.value});
  }, [debounceSearch, page, status]);


  const handleActionClick = (event, rowIndex) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuX(rect.left);
    setMenuY(rect.bottom);
    setShowActionMenu(true);
    setSelectedRowIndex(rowIndex);
  };

  const handleCloseMenu = () => {
    setShowActionMenu(false);
    setSelectedRowIndex(null);
  };

  const menuOptions = [
    {
        label: "Edit", action: () => {
        const item = data[selectedRowIndex];
        setSelectedItem(item);
        setTimeout(() => {
          setShowModal(true);
        }, 0);
    }},
    
  ];

  const handleAddEditCategory = async (values) => {
    console.log("🚀 ~ handleAddEditCategory ~ values:", values)
  }

  return (
    <main>
        <TopHeader title="Category">

        <DropDown placeholder={"Category"} options={STATUS_OPTIONS} setValue={(value) => {
          setStatus(value);
          setPage(1);
        }}/>
        <Input
          mainContClassName={classes?.mainContClassName}
          placeholder={"Search By Category"}
          rightIcon={<IoSearchOutline color="#B0CD6E" size={20} 
          />}
          customStyle={{ width: "300px" }}
        />
        <Button onClick={() => {setSelectedItem(null);
                setShowModal(true)}} label="Add Category" />
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
              
                  <HiOutlineDotsHorizontal
                    size={25}
                    className={classes.actionLink}
                    onClick={(event) => handleActionClick(event, rowIndex)}
                  />
                
              );
            }
            return item || "";
          }}
        />
        {showActionMenu && (
          <ActionMenu
            options={menuOptions}
            onClose={handleCloseMenu}
            x={menuX}
            y={menuY}
          />
        )}
      </div>
      {/* {showModal && <AddCategoryModal isOpen={showModal} onClose={() => {
        setShowModal(false);
        setSelectedItem(null);
      }} itemData={selectedItem} handleAddEditCategory={handleAddEditCategory}/>} */}
       {showModal && (
        <AddCategoryModal
          show={showModal}
          setShow={() => {
            setShowModal(false);
            setSelectedItem(null);
          }}
          itemData={selectedItem}
          handleAddEditCategory={handleAddEditCategory}
        />
      )}
    </main>
  );
};

export default CategoryTemplate;
