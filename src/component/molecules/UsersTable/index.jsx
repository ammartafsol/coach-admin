import AppTable from "@/component/organisms/AppTable/AppTable";
import { coachtableHeaders } from "@/developmentContent/tableHeader";
import React from "react";
import classes from "./UsersTable.module.css";

const UsersTable = ({subscribersData, loading, page, setPage, totalRecords, getData, currentFilters}) => {
  const handlePageChange = (p) => {
    setPage(p);
    getData({ 
      pg: p,
      ...currentFilters
    });
  };

  return (
    <div>
       <AppTable
          tableHeader={coachtableHeaders}
          data={subscribersData || []}
          hasPagination={true}
          loading={loading}
          totalItems={totalRecords}
          onPageChange={handlePageChange}
          currentPage={page}
          renderItem={({ item, key, rowIndex, renderValue }) => {
            const rowItem = subscribersData?.[rowIndex];
            if (renderValue) return renderValue(item, rowItem);
           
            return item || "";
          }}
        />
    </div>
  );
};

export default UsersTable;
