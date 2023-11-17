import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CupList from "@/components/page/cup/cup/cup-list";
import CupSearch from "@/components/page/cup/cup/cup-search";

const pageHeader: IPageHeader = {
  title: "컵 목록",
};

const CupListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <CupSearch />
      <CupList />
    </>
  );
};

CupListPage.getLayout = getDefaultLayout;
CupListPage.pageHeader = pageHeader;

export default CupListPage;
