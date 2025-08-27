import CMSDetailTemplate from "@/component/templates/AdminPages/CMSDetailTemplate";

const CMSDetailPage = async ({ params }) => {
  const { pageName } = await params;
  return <CMSDetailTemplate pageName={pageName} />;
};

export default CMSDetailPage;
