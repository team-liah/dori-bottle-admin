import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CupForm from "@/components/page/cup/cup/cup-form";

const pageHeader: IPageHeader = {
  title: "컵 등록",
};

const CupNewPage: IDefaultLayoutPage = () => {
  return <CupForm />;
};

CupNewPage.getLayout = getDefaultLayout;
CupNewPage.pageHeader = pageHeader;

export default CupNewPage;
