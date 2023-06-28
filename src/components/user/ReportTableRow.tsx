import { useRouter } from 'next/router';
import React from 'react';
import * as Custom from '@/components/common/CustomComponent';
import { ITableHeaderItem } from '@/types/table';
import { IReport } from '@/types/user';

interface IReportTapleRowProps {
  item: IReport;
  tableHeader: ITableHeaderItem[];
}

//#region Styled Component

//#endregion

const ReportTapleRow = (props: IReportTapleRowProps) => {
  const router = useRouter();

  return (
    <Custom.StyledTableRow
      onClick={() => router.push(`/user/report/${props.item.id}`)}
    >
      <Custom.StyledTableData>{props.item.id}</Custom.StyledTableData>
      <Custom.StyledTableData $link={true}>
        {props.item.typeText}
      </Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.reasonText}</Custom.StyledTableData>
      <Custom.StyledTableData
        $link={true}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/user/user/${props.item.user?.id}`);
        }}
      >
        {props.item.user?.id}
      </Custom.StyledTableData>
      <Custom.StyledTableData
        $link={true}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/user/user/${props.item.reportedUser?.id}`);
        }}
      >
        {props.item.reportedUser?.id}
      </Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.createdDate}</Custom.StyledTableData>
    </Custom.StyledTableRow>
  );
};

export default ReportTapleRow;
