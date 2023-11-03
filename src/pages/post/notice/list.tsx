import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import NoticeList from "@/components/page/post/notice/notice-list";
import NoticeSearch from "@/components/page/post/notice/notice-search";

const pageHeader: IPageHeader = {
  title: "공지사항 목록",
};

const NoticeListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <NoticeSearch />
      <NoticeList />
    </>
  );
};

NoticeListPage.getLayout = getDefaultLayout;
NoticeListPage.pageHeader = pageHeader;

export default NoticeListPage;
