import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import InquiryList from "@/components/page/user/inquiry/inquiry-list";
import InquirySearch from "@/components/page/user/inquiry/inquiry-search";

const pageHeader: IPageHeader = {
  title: "문의 목록",
};

const InquiryListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <InquirySearch />
      <InquiryList />
    </>
  );
};

InquiryListPage.getLayout = getDefaultLayout;
InquiryListPage.pageHeader = pageHeader;

export default InquiryListPage;
