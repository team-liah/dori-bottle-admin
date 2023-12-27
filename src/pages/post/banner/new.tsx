import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BannerForm from "@/components/page/post/banner/banner-form";

const pageHeader: IPageHeader = {
  title: "배너 등록",
};

const BannerNewPage: IDefaultLayoutPage = () => {
  return (
    <BannerForm
      initialValues={{
        visible: true,
        priority: 0,
        backgroundColor: "#ffffff",
      }}
    />
  );
};

BannerNewPage.getLayout = getDefaultLayout;
BannerNewPage.pageHeader = pageHeader;

export default BannerNewPage;
