import DashboardLayout from "@/component/molecules/DashboardLayout";
import Header from "@/component/organisms/Header";
import AuthGuard from "@/component/atoms/AuthGuard";
import React from "react";

const layout = ({ children }) => {
  return (
    <AuthGuard>
      <div>
        <DashboardLayout>
          <Header />
          <div className={"mainChild"}>
          {children}
          </div>
        </DashboardLayout>
      </div>
    </AuthGuard>
  );
};

export default layout;
