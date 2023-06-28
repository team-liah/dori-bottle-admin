import { Radio } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import Alert from '../common/Alert';
import * as Custom from '@/components/common/CustomComponent';
import { IQuestion } from '@/types/user';

interface IQuestionDetailComponentProps {
  data?: IQuestion;
  onSubmit: (data: any) => void;
  onDelete?: () => void;
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

const ButtonContainer = tw.div`
  mt-5 flex justify-between`;

//#endregion

const QuestionDetailComponent = (props: IQuestionDetailComponentProps) => {
  const [alertMessage, setAlertMessage] = useState<string>('');

  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    setValue('contents', props.data?.contents || '');
    setValue('description', props.data?.description || '');
    setValue('enabled', props.data?.enabled || true);
  }, [props.data, setValue]);

  const onSubmit = async (values: any) => {
    if (!values.contents) {
      setAlertMessage('제목을 입력해주세요.');

      return;
    } else if (!values.description) {
      setAlertMessage('내용을 입력해주세요.');

      return;
    }

    props.onSubmit(values);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          {props.data && (
            <InputContainer>
              <Label>ID</Label>
              <ContentContainer>{props.data?.id}</ContentContainer>
            </InputContainer>
          )}
          <InputContainer>
            <Label>
              제목
              <Custom.RequireCircle />
            </Label>
            <Custom.Input
              type="text"
              style={{ width: '300px' }}
              {...register('contents')}
            ></Custom.Input>
          </InputContainer>
          <InputContainer>
            <Label>
              내용
              <Custom.RequireCircle />
            </Label>
            <Custom.Input
              type="text"
              {...register('description')}
            ></Custom.Input>
          </InputContainer>
          <InputContainer>
            <Label>답변 수</Label>
            <ContentContainer>{props.data?.answerCount || 0}</ContentContainer>
          </InputContainer>
          <InputContainer>
            <Label>
              활성 여부
              <Custom.RequireCircle />
            </Label>
            <Radio.Group
              className="flex flex-col gap-2"
              value={watch('enabled')}
              onChange={(e) => setValue('enabled', e.target.value)}
            >
              <Radio value={true}>활성</Radio>
              <Radio value={false}>비활성</Radio>
            </Radio.Group>
          </InputContainer>
          <ButtonContainer>
            <Custom.Button type="submit">
              {props.data ? '수정' : '저장'}
            </Custom.Button>
            {props.data && (
              <Custom.DeleteButton type="button" onClick={props.onDelete}>
                삭제
              </Custom.DeleteButton>
            )}
          </ButtonContainer>
        </Container>
      </form>
      <Alert
        open={alertMessage !== ''}
        message={alertMessage}
        onCloseModal={() => setAlertMessage('')}
      />
    </Fragment>
  );
};

export default QuestionDetailComponent;
