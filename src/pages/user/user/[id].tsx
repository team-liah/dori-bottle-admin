import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import { createUser, deleteUsers, getUser, updateUser } from '@/api/user';
import Alert from '@/components/common/Alert';
import * as Custom from '@/components/common/CustomComponent';
import SidebarLayout from '@/components/layout/SidebarLayout';
import UserDetailComponent from '@/components/user/UserDetail';
import { IUser } from '@/types/user';

//#region Styled Component

//#endregion

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR<IUser>(`/api/user/${id}`, () =>
    getUser(id as string),
  );
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleSubmit = async (user: any) => {
    if (data) {
      await updateUser(id as string, { ...data, ...user });
      setAlertMessage('수정되었습니다.');
    } else {
      await createUser(user);
      setAlertMessage('등록되었습니다.');
    }
    mutate();
  };

  const handleDelete = async () => {
    try {
      await deleteUsers([id as string]);
      setAlertMessage('삭제되었습니다.');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SidebarLayout>
      <Custom.TitleContainer>
        <Custom.Title>사용자 상세</Custom.Title>
      </Custom.TitleContainer>
      <Custom.ShadowContainer>
        <UserDetailComponent
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
          router.push('/user/user');
        }}
      />
    </SidebarLayout>
  );
};

export default UserDetail;
