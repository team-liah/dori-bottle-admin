import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BubbleForm from "@/components/page/product/bubble/bubble-form";

const pageHeader: IPageHeader = {
  title: "버블 등록",
};

const BubbleNewPage: IDefaultLayoutPage = () => {
  return <BubbleForm />;
};

BubbleNewPage.getLayout = getDefaultLayout;
BubbleNewPage.pageHeader = pageHeader;

export default BubbleNewPage;
