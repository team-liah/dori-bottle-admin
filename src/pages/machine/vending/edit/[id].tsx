import { useMachine } from "@/client/machine";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import VendingForm from "@/components/page/machine/vending/vending-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "자판기 수정",
};

const VendingEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useMachine(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <VendingForm id={router.query.id as string} initialValues={data} />;
};

VendingEditPage.getLayout = getDefaultLayout;
VendingEditPage.pageHeader = pageHeader;

export default VendingEditPage;
