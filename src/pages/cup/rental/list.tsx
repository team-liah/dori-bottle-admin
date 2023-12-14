import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import RentalList from "@/components/page/cup/rental/rental-list";
import RentalSearch from "@/components/page/cup/rental/rental-search";

const pageHeader: IPageHeader = {
  title: "대여 목록",
};

const RentalListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <RentalSearch />
      <RentalList />
    </>
  );
};

RentalListPage.getLayout = getDefaultLayout;
RentalListPage.pageHeader = pageHeader;

export default RentalListPage;
