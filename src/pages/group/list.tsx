import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import GroupList from "@/components/page/group/group-list";
import GroupSearch from "@/components/page/group/group-search";

const pageHeader: IPageHeader = {
  title: "기관 목록",
};

const GroupListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <GroupSearch />
      <GroupList />
    </>
  );
};

GroupListPage.getLayout = getDefaultLayout;
GroupListPage.pageHeader = pageHeader;

export default GroupListPage;
