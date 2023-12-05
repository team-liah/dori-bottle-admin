import { IDefaultLayoutPage, IPageHeader, getDefaultLayout } from "@/components/layout/default-layout";
import CalendarSample from "@/components/page/index/calendar-sample";
import StatisticSample from "@/components/page/index/statistic-sample";
import { useAuth } from "@/lib/auth/auth-provider";
import { Divider } from "antd";

const pageHeader: IPageHeader = {
  title: "Welcome",
};

const IndexPage: IDefaultLayoutPage = () => {
  const { profile } = useAuth();

  return (
    <>
      <h2 className="title">👋 {profile?.name || "관리자"}님 안녕하세요!</h2>

      {profile?.role === "ADMIN" && (
        <>
          <StatisticSample />
          <Divider />

          <CalendarSample />
        </>
      )}
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
