"use client";
import TopHeader from "@/component/atoms/TopHeader";
import React, { useEffect, useState } from "react";
import classes from "./TransansactionTemplate.module.css";  
import TransactionCard from "@/component/molecules/TransactionCard";
import useAxios from "@/interceptor/axiosInterceptor";
import useDebounce from "@/resources/hooks/useDebounce";
import { TRANSACTION_STATUS_OPTIONS } from "@/developmentContent/dropdownOption";
import FilterHeader from "@/component/molecules/FilterHeader/FilterHeader";
import { Loader } from "@/component/atoms/Loader";
import NoData from "@/component/atoms/NoData/NoData";

const TransansactionTemplate = () => {

  const { Get} = useAxios();
  
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState("");
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [status, setStatus] = useState(TRANSACTION_STATUS_OPTIONS[0]);
 
  const getTransactionData = async ({
    _search = debounceSearch,
    status = status,
  }) => {
    if (loading === "loading") return;

    const params = {
      search: _search,
      ...(status && { status: status?.value }),
    };
    const query = new URLSearchParams(params).toString();

    setLoading("loading");

    const { response } = await Get({
      route: `admin/transactions?${query}`,
    });

    if (response) {
      setTransactionData(response?.data);
    }

    setLoading("");
  };

  useEffect(() => {
    getTransactionData({ _search: debounceSearch, status: status });

  }, [debounceSearch ,status]);
    
  return (
    <div>
      <TopHeader title="Transactions">
        <FilterHeader
          inputPlaceholder="Search"
          customStyle={{ width: "300px" }}
          onChange={(value) => {
            setSearch(value);
            
          }}
          showDropDown={true}
          dropdownOption={TRANSACTION_STATUS_OPTIONS}
          placeholder={"Status"}
          setValue={(value) => {
            setStatus(value);
          }}
          value={status}
        />
         
      </TopHeader>
      <div className={classes.transactionCardContainer}>
      {loading === "loading" ? (
        <Loader />
      ) : transactionData && transactionData.length > 0 ? (
        transactionData.map((item) => (
          <TransactionCard
            key={item._id}
           item={item}
          />
        ))
      ) : (
        <NoData text="No transactions found" />
      )}
      </div>
    </div>
  );
};

export default TransansactionTemplate;
