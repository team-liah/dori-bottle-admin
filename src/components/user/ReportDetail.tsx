import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import tw from 'tailwind-styled-components';
import { IReport } from '@/types/user';

interface IReportDetailComponentProps {
  data?: IReport;
}

//#region Styled Component

const Container = tw.div`
  flex flex-col gap-8 p-6`;

const RowContainer = tw.div`
  w-[300px] flex flex-row gap-1`;

const InputContainer = tw.div`
  flex flex-col w-full gap-2`;

const Label = tw.label`
  text-sm font-bold text-gray-700`;

const ContentContainer = tw.div<{ $link?: boolean }>`
  pt-2 text-[13px] text-gray-700 ${(props) =>
    props.$link
      ? 'cursor-pointer underline underline-offset-2 hover:text-blue'
      : ''}`;

//#endregion

const ReportDetailComponent = (props: IReportDetailComponentProps) => {
  const router = useRouter();

  return (
    <Fragment>
      <Container>
        <InputContainer>
          <Label>신고 유형</Label>
          <ContentContainer>{props.data?.typeText}</ContentContainer>
        </InputContainer>
        <InputContainer>
          <Label>신고 사유</Label>
          <ContentContainer>{props.data?.reasonText}</ContentContainer>
        </InputContainer>
        <InputContainer>
          <Label>
            신고 소스 (
            {props.data?.type === 'CHATTING'
              ? '채팅방 ID'
              : props.data?.type === 'ANSWER'
              ? '답변 ID'
              : '사용자 ID'}
            )
          </Label>
          <ContentContainer>{props.data?.sourceId}</ContentContainer>
        </InputContainer>
        <InputContainer>
          <Label>신고 내용</Label>
          <ContentContainer>
            {props.data?.type === 'PROFILE_PHOTO' ? (
              <Image
                alt={props.data.reasonText}
                src={props.data?.content || ''}
                width={200}
                height={400}
              ></Image>
            ) : (
              props.data?.content
            )}
          </ContentContainer>
        </InputContainer>
        <RowContainer>
          <InputContainer>
            <Label>신고한 사용자</Label>
            <ContentContainer
              $link={true}
              onClick={() => router.push(`/user/user/${props.data?.user?.id}`)}
            >
              {props.data?.user?.id}
            </ContentContainer>
          </InputContainer>
          <InputContainer>
            <Label>신고 당한 사용자</Label>
            <ContentContainer
              $link={true}
              onClick={() =>
                router.push(`/user/user/${props.data?.reportedUser?.id}`)
              }
            >
              {props.data?.reportedUser?.id}
            </ContentContainer>
          </InputContainer>
        </RowContainer>
        <InputContainer>
          <Label>신고 일시</Label>
          <ContentContainer>{props.data?.createdDate}</ContentContainer>
        </InputContainer>
      </Container>
    </Fragment>
  );
};

export default ReportDetailComponent;
