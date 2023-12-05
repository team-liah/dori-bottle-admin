import { useUser } from "@/client/user";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import UserForm from "@/components/page/user/user-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "회원 수정",
};

const UserEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useUser(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <UserForm id={router.query.id as string} initialValues={data} />;
};

UserEditPage.getLayout = getDefaultLayout;
UserEditPage.pageHeader = pageHeader;

export default UserEditPage;
