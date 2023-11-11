import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CollectionList from "@/components/page/machine/collection/collection-list";
import CollectionSearch from "@/components/page/machine/collection/collection-search";

const pageHeader: IPageHeader = {
  title: "반납함 목록",
};

const CollectionListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <CollectionSearch />
      <CollectionList />
    </>
  );
};

CollectionListPage.getLayout = getDefaultLayout;
CollectionListPage.pageHeader = pageHeader;

export default CollectionListPage;
