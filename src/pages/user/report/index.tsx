import React, { useState } from 'react';
import useSWR from 'swr';
import { getReports } from '@/api/user';
import * as Custom from '@/components/common/CustomComponent';
import Searchbar from '@/components/common/SearchBar';
import Table from '@/components/common/Table';
import SidebarLayout from '@/components/layout/SidebarLayout';
import TableLayout from '@/components/layout/TableLayout';
import ReportTapleRow from '@/components/user/ReportTableRow';
import useSort from '@/hooks/useSort';
import { IReport } from '@/types/user';

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
    label: '신고 유형',
    key: 'type',
    width: '20%',
    type: 'string',
  },
  {
    label: '신고 사유',
    key: 'reason',
    width: '25%',
    type: 'string',
  },
  {
    label: '신고한 사용자',
    key: 'user.id',
    width: '15%',
    type: 'string',
  },
  {
    label: '신고된 사용자',
    key: 'reportedUser.id',
    width: '15%',
    type: 'string',
  },
  {
    label: '신고 일시',
    key: 'createdDate',
    width: '15%',
    type: 'string',
  },
];

const Index = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const { sort, handleSort } = useSort(tableHeader);
  const { data } = useSWR(
    `/api/admin/reports?keyword=${keyword}&page=${page}&sort=${sort.key},${sort.order}`,
    () => getReports(keyword, page, 8, sort),
  );

  return (
    <SidebarLayout>
      <Custom.TitleContainer>
        <Custom.Title>Report</Custom.Title>
      </Custom.TitleContainer>
      <TableLayout
        header={<Searchbar keyword={keyword} onChangeKeyword={setKeyword} />}
      >
        <Table
          title="Report"
          tableHeader={tableHeader}
          sort={sort}
          totalPage={1}
          page={page}
          onChangePage={setPage}
          onSort={handleSort}
        >
          {data?.map((item: IReport) => (
            <ReportTapleRow
              key={item.id}
              item={item}
              tableHeader={tableHeader}
            />
          ))}
        </Table>
      </TableLayout>
    </SidebarLayout>
  );
};

export default Index;
