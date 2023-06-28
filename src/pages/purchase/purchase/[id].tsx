import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import { getPurchase } from '@/api/purchase';
import Alert from '@/components/common/Alert';
import * as Custom from '@/components/common/CustomComponent';
import SidebarLayout from '@/components/layout/SidebarLayout';
import PurchaseDetailComponent from '@/components/purchase/PurchaseDetail';
import { IPurchase } from '@/types/purchase';

//#region Styled Component

//#endregion

const PurchaseDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR<IPurchase>(`/api/purchase/${id}`, () =>
    getPurchase(id as string),
  );
  const [alertMessage, setAlertMessage] = useState<string>('');

  return (
    <SidebarLayout>
      <Custom.TitleContainer>
        <Custom.Title>결제 상세</Custom.Title>
      </Custom.TitleContainer>
      <Custom.ShadowContainer>
        <PurchaseDetailComponent data={data} />
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

export default PurchaseDetail;
