"use client";

import classes from "./CMSTemplate.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AppTable from "@/component/organisms/AppTable/AppTable";
import useAxios from "@/interceptor/axiosInterceptor";
import { CmsTableHeader } from "@/developmentContent/tableHeader";
import { AiTwotoneEdit } from "react-icons/ai";

export default function CMSTemplate() {
  const { Get } = useAxios();
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("table"); // table

  // get data
  const getData = async (_pg = 1, _s = "") => {
    const route = `cms/page/all`;
    setLoading("table");
    const { response } = await Get({ route });
    setLoading("");

    if (response) {
      const res = response?.data;
      const dataArray = Object.keys(res)
        ?.filter((key) => !unwantedKeys.includes(key))
        .map((key) => {
          return {
            pageName: key,
          };
        });
      setData(dataArray);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.cmsTemplate}>
      <Container>
        <AppTable
          onKeyClick={({ pageName }) => {
            router.push(`/cms/${pageName}`);
          }}
          hasPagination={false}
          data={data}
          noDataText="No Data Found"
          loading={loading === "table"}
          tableHeader={CmsTableHeader}
          renderItem={({ item, key, rowIndex, renderValue }) => {
            const dataRow = data[rowIndex];
            if (key === "sno") {
              return rowIndex + 1;
            }
            if (key === "action") {
              return (
                <div>
                  <AiTwotoneEdit
                    size={24}
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push(`/cms/${dataRow?.pageName}`)}
                  />
                </div>
              );
            }
            if (renderValue) return renderValue(item, dataRow);
            return item || "";
          }}
        />
      </Container>
    </div>
  );
}

const unwantedKeys = ["_id", "updatedAt", "__v", "createdAt"];
//  cms detail
