import { usePost } from "@/client/post";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import FaqForm from "@/components/page/post/faq/faq-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "FAQ 수정",
};

const FaqEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = usePost(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <FaqForm id={router.query.id as string} initialValues={data} />;
};

FaqEditPage.getLayout = getDefaultLayout;
FaqEditPage.pageHeader = pageHeader;

export default FaqEditPage;
