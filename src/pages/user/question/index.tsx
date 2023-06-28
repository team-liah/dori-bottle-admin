import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useSWR from 'swr';
import { getQuestions } from '@/api/user';
import * as Custom from '@/components/common/CustomComponent';
import Searchbar from '@/components/common/SearchBar';
import Table from '@/components/common/Table';
import SidebarLayout from '@/components/layout/SidebarLayout';
import TableLayout from '@/components/layout/TableLayout';
import QuestionTableRow from '@/components/user/QuestionTableRow';
import useSelect from '@/hooks/useSelect';
import useSort from '@/hooks/useSort';
import { IQuestion } from '@/types/user';

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
    label: '제목',
    key: 'contents',
    width: '40%',
    type: 'string',
  },
  {
    label: '답변 수',
    key: 'answerCount',
    width: '20%',
    type: 'string',
  },
  {
    label: '활성 여부',
    key: 'enabled',
    width: '30%',
    type: 'string',
  },
];

const Index = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const { sort, handleSort } = useSort(tableHeader);
  const { data, mutate } = useSWR(
    `/api/admin/questions?keyword=${keyword}&page=${page}&sort=${sort.key},${sort.order}`,
    () => getQuestions(keyword, page, 8, sort),
  );
  const { selectedItems, handleSelectItem, handleSelectAllItems } =
    useSelect(data);

  const handleDelete = async () => {
    try {
      mutate();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <SidebarLayout>
      <Custom.TitleContainer>
        <Custom.Title>Question</Custom.Title>
        <Custom.ButtonContainer>
          {selectedItems.length > 0 && (
            <Custom.DeleteButton onClick={handleDelete}>
              DELETE
            </Custom.DeleteButton>
          )}
          <Custom.CreateButton
            onClick={() => router.push('/user/question/create')}
          >
            CREATE NEW
          </Custom.CreateButton>
        </Custom.ButtonContainer>
      </Custom.TitleContainer>
      <TableLayout
        header={<Searchbar keyword={keyword} onChangeKeyword={setKeyword} />}
      >
        <Table
          title="Question"
          tableHeader={tableHeader}
          isAllSelected={selectedItems.length === data?.length}
          onClickAllSelected={handleSelectAllItems}
          sort={sort}
          totalPage={1}
          page={page}
          onChangePage={setPage}
          onSort={handleSort}
        >
          {data?.map((item: IQuestion) => (
            <QuestionTableRow
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

export default Index;
