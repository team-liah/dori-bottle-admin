import { useRental } from "@/client/rental";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import RentalForm from "@/components/page/cup/rental/rental-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "대여 상세",
};

const RentalEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useRental(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <RentalForm id={router.query.id as string} initialValues={data} />;
};

RentalEditPage.getLayout = getDefaultLayout;
RentalEditPage.pageHeader = pageHeader;

export default RentalEditPage;
