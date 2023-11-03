import { usePost } from "@/client/post";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import NoticeForm from "@/components/page/post/notice/notice-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "공지사항 수정",
};

const NoticeEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = usePost(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <NoticeForm id={router.query.id as string} initialValues={data} />;
};

NoticeEditPage.getLayout = getDefaultLayout;
NoticeEditPage.pageHeader = pageHeader;

export default NoticeEditPage;
