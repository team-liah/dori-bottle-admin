import { Divider } from 'antd';
import {
  IDefaultLayoutPage,
  IPageHeader,
  getDefaultLayout,
} from '@/components/layout/default-layout';
import { useAuth } from '@/lib/auth/auth-provider';

const pageHeader: IPageHeader = {
  title: 'Welcome',
};

const IndexPage: IDefaultLayoutPage = () => {
  const { profile } = useAuth();

  return (
    <>
      <h2 className="title">👋 {profile?.name || '관리자'}님 안녕하세요!</h2>

      <Divider />
    </>
  );
};

IndexPage.getLayout = getDefaultLayout;
IndexPage.pageHeader = pageHeader;

export default IndexPage;
