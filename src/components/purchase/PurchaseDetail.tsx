import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomComponent';
import { IPurchase } from '@/types/purchase';
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

interface IPurchaseDetailComponentProps {
  data?: IPurchase;
}

//#region Styled Component

const Container = tw.div`
  flex flex-col gap-8 p-6`;

const InputContainer = tw.div`
  flex flex-col w-full gap-2`;

const Label = tw.label`
  text-sm font-bold text-gray-700`;

const ContentContainer = tw.div<{ $link?: boolean }>`
  pt-2 text-[13px] text-gray-700 ${(props) =>
    props.$link
      ? 'cursor-pointer underline underline-offset-2 hover:text-blue'
      : ''}`;

const DetailContainer = tw(ContentContainer)`
  p-4 bg-gray-light`;

//#endregion

const PurchaseDetailComponent = (props: IPurchaseDetailComponentProps) => {
  const router = useRouter();

  if (!props.data) return <div>데이터가 없습니다.</div>;

  return (
    <Fragment>
      <Container>
        <InputContainer>
          <Label>주문 ID</Label>
          <ContentContainer>{props.data?.order_id}</ContentContainer>
        </InputContainer>
        <InputContainer>
          <Label>SKU</Label>
          <ContentContainer>{props.data?.sku}</ContentContainer>
        </InputContainer>
        <InputContainer>
          <Label>구매자 (사용자 ID)</Label>
          <ContentContainer
            $link={true}
            onClick={() => router.push(`/user/user/${props.data?.user_id}`)}
          >
            {props.data?.user_id}
          </ContentContainer>
        </InputContainer>
        <InputContainer>
          <Label>결제일시</Label>
          <ContentContainer>{props.data?.created_date}</ContentContainer>
        </InputContainer>
        <InputContainer>
          <Label>결제상태</Label>
          <ContentContainer>{props.data?.status}</ContentContainer>
        </InputContainer>
        <InputContainer>
          <Label>정보</Label>
          <Custom.ShadowContainer>
            <DetailContainer>
              <DynamicReactJson
                src={props.data?.receipt}
                enableClipboard={false}
                displayDataTypes={false}
                displayObjectSize={false}
              />
            </DetailContainer>
          </Custom.ShadowContainer>
        </InputContainer>
      </Container>
    </Fragment>
  );
};

export default PurchaseDetailComponent;
