import { useMachine } from "@/client/machine";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import CollectionForm from "@/components/page/machine/collection/collection-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "반납함 수정",
};

const CollectionEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useMachine(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <CollectionForm id={router.query.id as string} initialValues={data} />;
};

CollectionEditPage.getLayout = getDefaultLayout;
CollectionEditPage.pageHeader = pageHeader;

export default CollectionEditPage;
