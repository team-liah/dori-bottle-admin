import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import FaqList from "@/components/page/post/faq/faq-list";
import FaqSearch from "@/components/page/post/faq/faq-search";

const pageHeader: IPageHeader = {
  title: "FAQ 목록",
};

const FaqListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <FaqSearch />
      <FaqList />
    </>
  );
};

FaqListPage.getLayout = getDefaultLayout;
FaqListPage.pageHeader = pageHeader;

export default FaqListPage;
