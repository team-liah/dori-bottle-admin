import { useAdmin } from "@/client/admin";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import AdminForm from "@/components/page/admin/admin-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "관리자 수정",
};

const AdminEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useAdmin(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <AdminForm id={router.query.id as string} initialValues={data} />;
};

AdminEditPage.getLayout = getDefaultLayout;
AdminEditPage.pageHeader = pageHeader;

export default AdminEditPage;
