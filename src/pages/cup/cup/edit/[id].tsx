import { useCup } from "@/client/cup";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CupForm from "@/components/page/cup/cup/cup-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "컵 수정",
};

const CupEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useCup(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <CupForm id={router.query.id as string} initialValues={data} />;
};

CupEditPage.getLayout = getDefaultLayout;
CupEditPage.pageHeader = pageHeader;

export default CupEditPage;
