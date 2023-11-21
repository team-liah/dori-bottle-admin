import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BubbleForm from "@/components/page/product/bubble/bubble-form";

const pageHeader: IPageHeader = {
  title: "버블 상품 등록",
};

const BubbleNewPage: IDefaultLayoutPage = () => {
  return (
    <BubbleForm
      initialValues={{
        discountRate: 0,
      }}
    />
  );
};

BubbleNewPage.getLayout = getDefaultLayout;
BubbleNewPage.pageHeader = pageHeader;

export default BubbleNewPage;
