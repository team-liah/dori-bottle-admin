import { useBubble } from "@/client/product";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BubbleForm from "@/components/page/product/bubble/bubble-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "버블 수정",
};

const BubbleEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useBubble(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <BubbleForm id={router.query.id as string} initialValues={data} />;
};

BubbleEditPage.getLayout = getDefaultLayout;
BubbleEditPage.pageHeader = pageHeader;

export default BubbleEditPage;
