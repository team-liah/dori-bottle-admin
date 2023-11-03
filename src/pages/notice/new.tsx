import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import NoticeForm from "@/components/page/notice/notice-form";

const pageHeader: IPageHeader = {
  title: "공지사항 등록",
};

const NoticeNewPage: IDefaultLayoutPage = () => {
  return <NoticeForm />;
};

NoticeNewPage.getLayout = getDefaultLayout;
NoticeNewPage.pageHeader = pageHeader;

export default NoticeNewPage;
