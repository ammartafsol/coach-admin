"use client";
import React from "react";
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
import UserProfile from "@/component/organisms/UserProfile/UserProfile";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";

const CategoryTemplate = () => {

  const { get } = useAxios();
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState(categoryTableData ?? []);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [totalRecords, setTotalRecords] = useState(data?.length ?? 0);
  const [filter, setFilter] = useState({
    status: "all",
  });

  const getData = async ({ pg = page, _search = debounceSearch }) => {
    const params = {
      page: pg,
      search: _search,
      status: filter.status,
    };
    const query = new URLSearchParams(params).toString();

    if (loading === "loading") return;

    setLoading("loading");

    const response = await get({
      route: `admin/category/all?${query}`,
    });

    if (response) {
      setData(response.data);
      setPage(pg);
      setTotalRecords(response.totalRecords);
    }

    setLoading("");
  };

  const [showActionMenu, setShowActionMenu] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);

  const router = useRouter();

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
    { label: "Deactivate", action: () => router.push("/user/213") },
    { label: "View Detail", action: () => router.push("/user/213") },
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
      </TopHeader>
      <div>
        <AppTable
          tableHeader={categoryTableHeaders}
          data={data}
          hasPagination={true}
          loading={loading === "loading"}
          totalItems={totalRecords}
          onPageChange={(pg) => {
            setPage(pg);
            getData({ pg });
          }}
          currentPage={page}
          renderItem={({ item, key, rowIndex, renderValue }) => {
            const rowItem = data[rowIndex];
            if (renderValue) {
              return renderValue(item, rowItem);
            }
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
    </>
  );
};

export default CategoryTemplate;
