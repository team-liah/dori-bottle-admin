import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import FaqForm from "@/components/page/post/faq/faq-form";

const pageHeader: IPageHeader = {
  title: "FAQ 등록",
};

const FaqNewPage: IDefaultLayoutPage = () => {
  return <FaqForm />;
};

FaqNewPage.getLayout = getDefaultLayout;
FaqNewPage.pageHeader = pageHeader;

export default FaqNewPage;
