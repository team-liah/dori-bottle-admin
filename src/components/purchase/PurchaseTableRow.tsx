import { useRouter } from 'next/router';
import React from 'react';
import * as Custom from '@/components/common/CustomComponent';
import { IPurchase } from '@/types/purchase';
import { ITableHeaderItem } from '@/types/table';

interface IPurchaseTableRowProps {
  item: IPurchase;
  tableHeader: ITableHeaderItem[];
}

//#region Styled Component

//#endregion

const PurchaseTableRow = (props: IPurchaseTableRowProps) => {
  const router = useRouter();

  return (
    <Custom.StyledTableRow
      onClick={() => router.push(`/purchase/purchase/${props.item.id}`)}
    >
      <Custom.StyledTableData>{props.item.id}</Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.order_id}</Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.sku}</Custom.StyledTableData>
      <Custom.StyledTableData
        $link={true}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/user/user/${props.item.user_id}`);
        }}
      >
        {props.item.user_id}
      </Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.status}</Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.created_date}</Custom.StyledTableData>
    </Custom.StyledTableRow>
  );
};

export default PurchaseTableRow;
