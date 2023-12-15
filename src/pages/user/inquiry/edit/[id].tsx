import { useInquiry } from "@/client/inquiry";
import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import InquiryForm from "@/components/page/user/inquiry/inquiry-form";
import { Alert, Skeleton } from "antd";
import { useRouter } from "next/router";

const pageHeader: IPageHeader = {
  title: "문의 상세",
};

const InquiryEditPage: IDefaultLayoutPage = () => {
  const router = useRouter();
  const { data, error, isLoading, isValidating } = useInquiry(router.query.id as string);

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" className="my-5" />;
  }

  if (!data || isLoading || isValidating) {
    return <Skeleton className="my-5" />;
  }

  return <InquiryForm id={router.query.id as string} initialValues={data} />;
};

InquiryEditPage.getLayout = getDefaultLayout;
InquiryEditPage.pageHeader = pageHeader;

export default InquiryEditPage;
