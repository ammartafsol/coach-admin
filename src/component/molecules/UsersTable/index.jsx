import AppTable from "@/component/organisms/AppTable/AppTable";
import { coachtableHeaders } from "@/developmentContent/tableHeader";
import React from "react";
import classes from "./UsersTable.module.css";
import { USER_ACTION_OPTIONS } from "@/developmentContent/dropdownOption";
import ActionMenu from "../ActionMenu/ActionMenu";

const UsersTable = ({subscribersData, loading, page, setPage, totalRecords}) => {
  return (
    <div>
       <AppTable
          tableHeader={coachtableHeaders}
          data={subscribersData}
          hasPagination={true}
          loading={loading === "loading"}
          totalItems={totalRecords}
          onPageChange={(p) => {
            setPage(p);
            getData({ pg: p });
          }}
          currentPage={page}
          renderItem={({ item, key, rowIndex, renderValue }) => {
            const rowItem = subscribersData[rowIndex];
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
    </div>
  );
};

export default UsersTable;
