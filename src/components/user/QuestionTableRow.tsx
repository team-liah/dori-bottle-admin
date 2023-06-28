import { Checkbox } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import * as Custom from '@/components/common/CustomComponent';
import { ITableHeaderItem } from '@/types/table';
import { IQuestion } from '@/types/user';

interface IQuestionTableRowProps {
  isSelected: boolean;
  item: IQuestion;
  tableHeader: ITableHeaderItem[];
  onSelect: () => void;
}

//#region Styled Component

//#endregion

const QuestionTableRow = (props: IQuestionTableRowProps) => {
  const router = useRouter();

  return (
    <Custom.StyledTableRow
      $disabled={!props.item.enabled}
      onClick={props.onSelect}
    >
      <Custom.StyledTableData>
        <Checkbox checked={props.isSelected} />
      </Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.id}</Custom.StyledTableData>
      <Custom.StyledTableData
        $link={true}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/user/question/${props.item.id}`);
        }}
      >
        {props.item.contents}
      </Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.answerCount}</Custom.StyledTableData>
      <Custom.StyledTableData>
        {props.item.enabled ? '활성' : '비활성'}
      </Custom.StyledTableData>
    </Custom.StyledTableRow>
  );
};

export default QuestionTableRow;
