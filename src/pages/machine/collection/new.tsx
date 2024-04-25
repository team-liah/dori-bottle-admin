import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CollectionForm from "@/components/page/machine/collection/collection-form";

const pageHeader: IPageHeader = {
  title: "반납함 등록",
};

const AdminNewPage: IDefaultLayoutPage = () => {
  return (
    <CollectionForm
      initialValues={{
        location: {
          latitude: 37.5512698,
          longitude: 126.98822,
        },
      }}
    />
  );
};

AdminNewPage.getLayout = getDefaultLayout;
AdminNewPage.pageHeader = pageHeader;

export default AdminNewPage;
