import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import AdminList from "@/components/page/admin/admin-list";
import AdminSearch from "@/components/page/admin/admin-search";

const pageHeader: IPageHeader = {
  title: "관리자 목록",
};

const AdminListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <AdminSearch />
      <AdminList />
    </>
  );
};

AdminListPage.getLayout = getDefaultLayout;
AdminListPage.pageHeader = pageHeader;

export default AdminListPage;
