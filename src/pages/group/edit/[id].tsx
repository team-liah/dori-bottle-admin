import { useGroup } from "@/client/group";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import GroupForm from "@/components/page/group/group-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "기관 수정",
};

const GroupEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useGroup(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <GroupForm id={router.query.id as string} initialValues={data} />;
};

GroupEditPage.getLayout = getDefaultLayout;
GroupEditPage.pageHeader = pageHeader;

export default GroupEditPage;
