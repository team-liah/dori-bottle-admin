import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import VendingList from "@/components/page/machine/vending/vending-list";
import VendingSearch from "@/components/page/machine/vending/vending-search";

const pageHeader: IPageHeader = {
  title: "자판기 목록",
};

const VendingListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <VendingSearch />
      <VendingList />
    </>
  );
};

VendingListPage.getLayout = getDefaultLayout;
VendingListPage.pageHeader = pageHeader;

export default VendingListPage;
