import { useBanner } from "@/client/banner";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import BannerForm from "@/components/page/post/banner/banner-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "배너 수정",
};

const BannerEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useBanner(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <BannerForm id={router.query.id as string} initialValues={data} />;
};

BannerEditPage.getLayout = getDefaultLayout;
BannerEditPage.pageHeader = pageHeader;

export default BannerEditPage;
