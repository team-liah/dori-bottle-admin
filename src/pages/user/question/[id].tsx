import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import {
  createQuestion,
  deleteQuestions,
  getQuestion,
  updateQuestion,
} from '@/api/user';
import Alert from '@/components/common/Alert';
import * as Custom from '@/components/common/CustomComponent';
import SidebarLayout from '@/components/layout/SidebarLayout';
import QuestionDetailComponent from '@/components/user/QuestionDetail';
import { IQuestion } from '@/types/user';

//#region Styled Component

//#endregion

const QuestionDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR<IQuestion>(`/api/question/${id}`, () =>
    getQuestion(id as string),
  );
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleSubmit = async (question: any) => {
    if (data) {
      await updateQuestion(id as string, { ...data, ...question });
      setAlertMessage('수정되었습니다.');
    } else {
      await createQuestion(question);
      setAlertMessage('등록되었습니다.');
    }
    mutate();
  };

  const handleDelete = async () => {
    try {
      await deleteQuestions([id as string]);
      setAlertMessage('삭제되었습니다.');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SidebarLayout>
      <Custom.TitleContainer>
        <Custom.Title>질문 상세</Custom.Title>
      </Custom.TitleContainer>
      <Custom.ShadowContainer>
        <QuestionDetailComponent
          data={data}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </Custom.ShadowContainer>
      <Alert
        open={alertMessage !== ''}
        message={alertMessage}
        onCloseModal={() => {
          setAlertMessage('');
          router.push('/user/question');
        }}
      />
    </SidebarLayout>
  );
};

export default QuestionDetail;
