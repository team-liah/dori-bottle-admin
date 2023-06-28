import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import { getPurchases } from '@/api/purchase';
import CheckboxFilter from '@/components/common/CheckboxFilter';
import * as Custom from '@/components/common/CustomComponent';
import Table from '@/components/common/Table';
import SidebarLayout from '@/components/layout/SidebarLayout';
import TableLayout from '@/components/layout/TableLayout';
import PurchaseTableRow from '@/components/purchase/PurchaseTableRow';
import useSort from '@/hooks/useSort';
import { IPurchase } from '@/types/purchase';

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
    label: '주문 ID',
    key: 'order_id',
    width: '20%',
    type: 'string',
  },
  {
    label: 'SKU',
    key: 'sku',
    width: '20%',
    type: 'string',
  },
  {
    label: '구매자',
    key: 'user_id',
    width: '10%',
    type: 'string',
  },
  {
    label: '결제상태',
    key: 'status',
    width: '10%',
    type: 'string',
  },
  {
    label: '결제일시',
    key: 'created_date',
    width: '10%',
    type: 'string',
  },
];

const purchaseStatus = [
  { id: 'PAID', name: 'PAID' },
  { id: 'REWARDED', name: 'REWARDED' },
  { id: 'REFUNDED', name: 'REFUNDED' },
];

const Index = () => {
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const { sort, handleSort } = useSort(tableHeader);
  const { data } = useSWR(
    `/api/admin/purchase?statusFilter=${JSON.stringify(
      statusFilter,
    )}page=${page}&sort=${sort.key},${sort.order}`,
    () => getPurchases(statusFilter, page, 8, sort),
  );

  useEffect(() => {
    setStatusFilter(purchaseStatus?.map((status) => status.id) || []);
  }, []);

  return (
    <SidebarLayout>
      <Custom.TitleContainer>
        <Custom.Title>Purchase</Custom.Title>
      </Custom.TitleContainer>
      <TableLayout
        header={
          <Fragment>
            <CheckboxFilter
              title="상태"
              options={purchaseStatus}
              value={statusFilter}
              onChange={(filter: CheckboxValueType[]) =>
                setStatusFilter(filter as string[])
              }
            />
          </Fragment>
        }
      >
        <Table
          title="Purchase"
          tableHeader={tableHeader}
          sort={sort}
          totalPage={4}
          page={page}
          onChangePage={setPage}
          onSort={handleSort}
        >
          {data?.map((item: IPurchase) => (
            <PurchaseTableRow
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
