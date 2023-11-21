import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BubbleList from "@/components/page/product/bubble/bubble-list";
import BubbleSearch from "@/components/page/product/bubble/bubble-search";

const pageHeader: IPageHeader = {
  title: "버블 상품 목록",
};

const BubbleListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <BubbleSearch />
      <BubbleList />
    </>
  );
};

BubbleListPage.getLayout = getDefaultLayout;
BubbleListPage.pageHeader = pageHeader;

export default BubbleListPage;
