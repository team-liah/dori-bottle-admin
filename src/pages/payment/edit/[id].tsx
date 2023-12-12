import { usePayment } from "@/client/payment";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import PaymentForm from "@/components/page/payment/payment-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "결제 상세",
};

const PaymentEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = usePayment(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <PaymentForm id={router.query.id as string} initialValues={data} />;
};

PaymentEditPage.getLayout = getDefaultLayout;
PaymentEditPage.pageHeader = pageHeader;

export default PaymentEditPage;
