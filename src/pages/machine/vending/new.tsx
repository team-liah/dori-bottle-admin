import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import VendingForm from "@/components/page/machine/vending/vending-form";

const pageHeader: IPageHeader = {
  title: "자판기 등록",
};

const AdminNewPage: IDefaultLayoutPage = () => {
  return (
    <VendingForm
      initialValues={{
        location: {
          latitude: 37.596578,
          longitude: 127.052435,
        },
      }}
    />
  );
};

AdminNewPage.getLayout = getDefaultLayout;
AdminNewPage.pageHeader = pageHeader;

export default AdminNewPage;
