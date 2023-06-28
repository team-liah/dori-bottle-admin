import { Dropdown, MenuProps, Radio } from 'antd';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import { ChevronDown } from 'react-feather';
import { useForm } from 'react-hook-form';
import tw from 'tailwind-styled-components';
import Alert from '../common/Alert';
import ImageUpload from '../common/ImageUpload';
import * as Custom from '@/components/common/CustomComponent';
import { IUser } from '@/types/user';

interface IUserDetailComponentProps {
  data?: IUser;
  onSubmit: (data: any) => void;
  onDelete?: () => void;
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

const ButtonContainer = tw.div`
  mt-5 flex justify-between`;

const ChevronDownIcon = tw(ChevronDown)`
  w-5 h-5 text-gray `;

//#endregion

const UserDetailComponent = (props: IUserDetailComponentProps) => {
  const [alertMessage, setAlertMessage] = useState<string>('');

  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    setValue('name', props.data?.name || '');
    setValue(
      'birthDate',
      props.data?.birthDate || '1990-01-01T15:00:00.000000Z',
    );
    setValue('gender', props.data?.gender || 'N');
    setValue('email', props.data?.email || '');
    setValue('phone', props.data?.phone || '');
    setValue(
      'authorities',
      props.data?.authorities?.includes('ROLE_ADMIN') ? 'admin' : 'user',
    );
  }, [props.data, setValue]);

  const onSubmit = async (values: any) => {
    if (!values.name) {
      setAlertMessage('이름을 입력해주세요.');

      return;
    }
    props.onSubmit({
      ...values,
      authorities:
        values.authorities === 'admin'
          ? ['ROLE_ADMIN', 'ROLE_USER']
          : ['ROLE_USER'],
    });
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <Custom.DropdownMenuContainer onClick={() => setValue('gender', 'M')}>
          남자
        </Custom.DropdownMenuContainer>
      ),
      key: 'M',
    },
    {
      label: (
        <Custom.DropdownMenuContainer onClick={() => setValue('gender', 'F')}>
          여자
        </Custom.DropdownMenuContainer>
      ),
      key: 'F',
    },
    {
      label: (
        <Custom.DropdownMenuContainer onClick={() => setValue('gender', 'N')}>
          선택 안함
        </Custom.DropdownMenuContainer>
      ),
      key: 'N',
    },
  ];

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <InputContainer>
            <Label>프로필 사진</Label>
            <ImageUpload
              src={props.data?.imageUrl}
              width="150px"
              height="150px"
              onChange={(file) => setValue('profileImage', file)}
              onDelete={() => setValue('profileImage', undefined)}
            />
          </InputContainer>
          <InputContainer>
            <Label>
              이름
              <Custom.RequireCircle />
            </Label>
            <Custom.Input
              type="text"
              style={{ width: '300px' }}
              {...register('name')}
            ></Custom.Input>
          </InputContainer>
          <InputContainer>
            <Label>
              생년월일
              <Custom.RequireCircle />
            </Label>
            <Custom.DatePicker
              className="w-[300px]"
              inputReadOnly={true}
              value={dayjs(watch('birthDate'), 'YYYY-MM-DD')}
              onChange={(date) =>
                setValue('birthDate', date || '1990-01-01T15:00:00.000000Z')
              }
            />
          </InputContainer>
          <InputContainer>
            <Label>
              성별
              <Custom.RequireCircle />
            </Label>
            <Dropdown trigger={['click']} menu={{ items }}>
              <Custom.DropdownContainer>
                {watch('gender') === 'M'
                  ? '남자'
                  : watch('gender') === 'F'
                  ? '여자'
                  : '선택 안함'}
                <ChevronDownIcon />
              </Custom.DropdownContainer>
            </Dropdown>
          </InputContainer>
          <InputContainer>
            <Label>이메일</Label>
            <Custom.Input
              type="text"
              style={{ width: '300px' }}
              {...register('email')}
              disabled={props.data !== undefined}
            ></Custom.Input>
          </InputContainer>
          <InputContainer>
            <Label>전화번호</Label>
            <Custom.Input
              type="text"
              style={{ width: '300px' }}
              {...register('phone')}
              disabled={props.data !== undefined}
            ></Custom.Input>
          </InputContainer>
          <InputContainer>
            <Label>소셜 로그인</Label>
            {props.data?.loginType || '없음'}
          </InputContainer>
          <RowContainer>
            <InputContainer>
              <Label>가입 일시</Label>
              {props.data?.createdDate}
            </InputContainer>
            <InputContainer>
              <Label>업데이트</Label>
              {props.data?.updatedDate}
            </InputContainer>
          </RowContainer>
          <InputContainer>
            <Label>
              권한
              <Custom.RequireCircle />
            </Label>
            <Radio.Group
              value={watch('authorities')}
              onChange={(e) => setValue('authorities', e.target.value)}
            >
              <Radio value={'admin'}>관리자</Radio>
              <Radio value={'user'}>일반 사용자</Radio>
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

export default UserDetailComponent;
