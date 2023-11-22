import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import GroupForm from "@/components/page/group/group-form";

const pageHeader: IPageHeader = {
  title: "기관 등록",
};

const GroupNewPage: IDefaultLayoutPage = () => {
  return (
    <GroupForm
      initialValues={{
        type: "UNIVERSITY",
        discountRate: 0,
      }}
    />
  );
};

GroupNewPage.getLayout = getDefaultLayout;
GroupNewPage.pageHeader = pageHeader;

export default GroupNewPage;
