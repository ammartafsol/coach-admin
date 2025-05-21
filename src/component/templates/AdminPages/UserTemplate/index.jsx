"use client";
import React from "react";
import classes from "./UserTemplate.module.css";
import TopHeader from "@/component/atoms/TopHeader";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { Input } from "@/component/atoms/Input";
import { IoSearchOutline } from "react-icons/io5";
import AppTable from "@/component/organisms/AppTable/AppTable";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { tableHeaders, tableUserHeaders } from "@/developmentContent/tableHeader";
import { CoachTableBody, tableUserData } from "@/developmentContent/tableBody";
import ActionMenu from "@/component/molecules/ActionMenu/ActionMenu";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserTemplate = () => {
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
    { label: "Deactivate", action: () => router.push('/user/213') },
    { label: "View Detail", action: () => router.push('/user/213')  },
  ];

  return (
    <>
      <TopHeader title="User">
        <DropDown placeholder={"Location"} />
        <DropDown placeholder={"Status"} />
        <Input
          mainContClassName={classes?.mainContClassName}
          placeholder={"Search By Name"}
          rightIcon={<IoSearchOutline color="#B0CD6E" size={20} />}
        />
      </TopHeader>
    <div>
      <AppTable tableHeader={tableUserHeaders} data={tableUserData}
            renderItem={({ item, key, rowIndex, renderValue }) => {
              const rowItem = CoachTableBody[rowIndex];
              if (renderValue) {
                return renderValue(item, rowItem);
              }
              if (key == "action") {
                return (
                 <HiOutlineDotsHorizontal  size={25} className={classes.actionLink}
                 onClick={(event) => handleActionClick(event, rowIndex)} />
                );
              }
              return item || "";
            }}
          />
      {showActionMenu && <ActionMenu options={menuOptions} onClose={handleCloseMenu} x={menuX} y={menuY} />}
    </div>
    </>
  );
};

export default UserTemplate;
