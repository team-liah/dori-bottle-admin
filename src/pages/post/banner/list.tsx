import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BannerList from "@/components/page/post/banner/banner-list";
import BannerSearch from "@/components/page/post/banner/banner-search";

const pageHeader: IPageHeader = {
  title: "배너 목록",
};

const BannerListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <BannerSearch />
      <BannerList />
    </>
  );
};

BannerListPage.getLayout = getDefaultLayout;
BannerListPage.pageHeader = pageHeader;

export default BannerListPage;
