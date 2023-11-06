import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import AdminForm from "@/components/page/admin/admin-form";

const pageHeader: IPageHeader = {
  title: "관리자 등록",
};

const AdminNewPage: IDefaultLayoutPage = () => {
  return (
    <AdminForm
      initialValues={{
        role: "ADMIN",
      }}
    />
  );
};

AdminNewPage.getLayout = getDefaultLayout;
AdminNewPage.pageHeader = pageHeader;

export default AdminNewPage;
