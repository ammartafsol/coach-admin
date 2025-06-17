"use client";
import React, { useEffect } from "react";
import classes from "./CategoryTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { Input } from "@/component/atoms/Input";
import { IoSearchOutline } from "react-icons/io5";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
    categoryTableHeaders,
} from "@/developmentContent/tableHeader";
import {categoryTableData } from "@/developmentContent/tableBody";
import ActionMenu from "@/component/molecules/ActionMenu/ActionMenu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import Button from "@/component/atoms/Button";
import AddCategoryModal from "@/component/molecules/Modal/AddCategory";

const CategoryTemplate = () => {

  const { Get } = useAxios();
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [totalRecords, setTotalRecords] = useState(data?.length ?? 0);
  const [status, setStatus] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  // STATUS_OPTIONS[0]

  const [showActionMenu, setShowActionMenu] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);

  const router = useRouter();
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
    console.log("🚀 ~ getData ~ response:", response)


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
    // { label: "Deactivate", action: () => router.push("/user/213") },
    // { label: "View Detail", action: () => router.push("/user/213") },
    { label: "Edit", action: () => {
        setSelectedItem(data[selectedRowIndex]);
        setShowModal(true);
    } },
  ];

  return (
    <>
        <TopHeader title="Category">

        <DropDown placeholder={"Category"} />
        <Input
          mainContClassName={classes?.mainContClassName}
          placeholder={"Search By Category"}
          rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
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
      {showModal && <AddCategoryModal isOpen={showModal} onClose={() => setShowModal(false)} itemData={selectedItem} />}
    </>
  );
};

export default CategoryTemplate;
