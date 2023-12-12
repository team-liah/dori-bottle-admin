import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import PaymentList from "@/components/page/payment/payment-list";
import PaymentSearch from "@/components/page/payment/payment-search";

const pageHeader: IPageHeader = {
  title: "결제 목록",
};

const PaymentListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <PaymentSearch />
      <PaymentList />
    </>
  );
};

PaymentListPage.getLayout = getDefaultLayout;
PaymentListPage.pageHeader = pageHeader;

export default PaymentListPage;
