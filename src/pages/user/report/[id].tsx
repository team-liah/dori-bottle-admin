import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import { getReport } from '@/api/user';
import Alert from '@/components/common/Alert';
import * as Custom from '@/components/common/CustomComponent';
import SidebarLayout from '@/components/layout/SidebarLayout';
import ReportDetailComponent from '@/components/user/ReportDetail';
import { IReport } from '@/types/user';

//#region Styled Component

//#endregion

const ReportDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<IReport>(`/api/user/${id}`, () =>
    getReport(id as string),
  );
  const [alertMessage, setAlertMessage] = useState<string>('');

  return (
    <SidebarLayout>
      <Custom.TitleContainer>
        <Custom.Title>신고 상세</Custom.Title>
      </Custom.TitleContainer>
      <Custom.ShadowContainer>
        <ReportDetailComponent data={data} />
      </Custom.ShadowContainer>
      <Alert
        open={alertMessage !== ''}
        message={alertMessage}
        onCloseModal={() => {
          setAlertMessage('');
          router.push('/user/report');
        }}
      />
    </SidebarLayout>
  );
};

export default ReportDetail;
