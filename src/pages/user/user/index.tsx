import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import { deleteUsers, getUsers } from '@/api/user';
import * as Custom from '@/components/common/CustomComponent';
import Searchbar from '@/components/common/SearchBar';
import Table from '@/components/common/Table';
import SidebarLayout from '@/components/layout/SidebarLayout';
import TableLayout from '@/components/layout/TableLayout';
import UserTableRow from '@/components/user/UserTableRow';
import useSelect from '@/hooks/useSelect';
import useSort from '@/hooks/useSort';
import { IUser } from '@/types/user';

//#region Styled Component

//#endregion

const tableHeader = [
  {
    label: 'ID',
    key: 'id',
    width: '10%',
    type: 'number',
  },
  {
    label: '이름',
    key: 'lastName,firstName',
    width: '20%',
    type: 'string',
  },
  {
    label: '이메일',
    key: 'email',
    width: '20%',
    type: 'string',
  },
  {
    label: '휴대폰',
    key: 'phone',
    width: '20%',
    type: 'string',
  },
  {
    label: '권한',
    key: 'authorities',
    width: '10%',
    type: 'string',
  },
  {
    label: '가입일시',
    key: 'createdDate',
    width: '20%',
    type: 'string',
  },
];

const User = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const { sort, handleSort } = useSort(tableHeader);
  const { data, mutate } = useSWR(
    `/api/admin/users?keyword=${keyword}&page=${page}&sort=${sort.key},${sort.order}`,
    () => getUsers(keyword, page, 8, sort),
  );
  const { selectedItems, handleSelectItem, handleSelectAllItems } =
    useSelect(data);

  const handleDelete = async () => {
    try {
      deleteUsers(selectedItems.map((item) => item.id));
      mutate();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SidebarLayout>
      <Custom.TitleContainer>
        <Custom.Title>User</Custom.Title>
        <Custom.ButtonContainer>
          {selectedItems.length > 0 && (
            <Custom.DeleteButton onClick={handleDelete}>
              DELETE
            </Custom.DeleteButton>
          )}
          <Custom.CreateButton onClick={() => router.push('/user/user/create')}>
            CREATE NEW
          </Custom.CreateButton>
        </Custom.ButtonContainer>
      </Custom.TitleContainer>
      <TableLayout
        header={<Searchbar keyword={keyword} onChangeKeyword={setKeyword} />}
      >
        <Table
          title="User"
          tableHeader={tableHeader}
          isAllSelected={selectedItems.length === data?.length}
          onClickAllSelected={handleSelectAllItems}
          sort={sort}
          totalPage={1}
          page={page}
          onChangePage={setPage}
          onSort={handleSort}
        >
          {data?.map((item: IUser) => (
            <UserTableRow
              key={item.id}
              item={item}
              isSelected={selectedItems.includes(item)}
              tableHeader={tableHeader}
              onSelect={() => handleSelectItem(item)}
            />
          ))}
        </Table>
      </TableLayout>
    </SidebarLayout>
  );
};

export default User;
