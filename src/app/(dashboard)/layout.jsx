import DashboardLayout from "@/component/molecules/DashboardLayout";
import Header from "@/component/organisms/Header";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <DashboardLayout>
        <Header />
        <div className={"mainChild"}>
        {children}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default layout;
