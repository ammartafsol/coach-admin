"use client";
import TopHeader from '@/component/atoms/TopHeader';
import React, { useEffect, useState } from 'react'
import classes from './CommissionsPage.module.css'
import AppTable from '@/component/organisms/AppTable/AppTable';
import { tableHeadersCommissiosData } from '@/developmentContent/tableHeader';
import ActionMenu from '@/component/molecules/ActionMenu/ActionMenu';
import useDebounce from '@/resources/hooks/useDebounce';
import { RECORDS_LIMIT } from '@/const';
import useAxios from '@/interceptor/axiosInterceptor';
import { EDIT_COMMISSION_OPTIONS, USER_ACTION_OPTIONS } from '@/developmentContent/dropdownOption';
import FilterHeader from '@/component/molecules/FilterHeader/FilterHeader';

export default function CommissionsPage() {
    const { Get } = useAxios();

  const [showModal, setShowModal] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const getData = async ({
    pg = page,
    _search = debounceSearch,
  }) => {
    
        const params = {
          page: pg,
          search: _search,
          limit: RECORDS_LIMIT,
        };
const query = new URLSearchParams(params).toString();

    setLoading('loading')

    const { response } = await Get({
      route: `admin/users/coach/all?${query}`,
    });
    if (response) {
      setData(response.data);
       setPage(pg);
      setTotalRecords(response?.totalRecords);
    }
    setLoading('')

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
              return (
                  <p className={classes.edit}>Edit</p>
              );
            }
            return item || "";
          }}
        />
      </div>
    </>
  )
}
