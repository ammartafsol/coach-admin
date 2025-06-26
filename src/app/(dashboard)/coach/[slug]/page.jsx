import CoachDetailTemplate from "@/component/templates/AdminPages/CoachDetailTemplate";
import React from "react";

const page = async ({ params }) => {
  const { slug } = await params;
  return <CoachDetailTemplate slug={slug} />;
};

export default page;
