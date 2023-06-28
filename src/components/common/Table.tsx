import { Checkbox } from 'antd';
import React from 'react';
import { ChevronUp } from 'react-feather';
import tw from 'tailwind-styled-components';
import Paging from './Paging';
import { ISort, ITableHeaderItem } from '@/types/table';

interface ITableProps {
  title?: string;
  tableHeader: ITableHeaderItem[];
  sort: ISort;
  totalPage?: number;
  page?: number;
  children: React.ReactNode;
  isAllSelected?: boolean;
  isAllDisabled?: boolean;
  onClickAllSelected?: () => void;
  onChangePage?: (page: number) => void;
  onSort: (key: string) => void;
}

//#region Styled Component

const Header = tw.div`
  flex flex-row items-center justify-between p-4`;

const Title = tw.span`
  text-md font-bold`;

const StyledTable = tw.table`
  w-full select-none`;

const StyledTableHeaderRow = tw.tr`
  bg-background-light`;

const StyledTableHeader = tw.th`
  px-4 py-3 text-left cursor-pointer truncate`;

const TriangleIcon = tw(ChevronUp)<{
  $selected: boolean;
  $order: 'asc' | 'desc';
}>`
  w-4 h-4 ml-1 inline stroke-[3px] cursor-pointer ${(props) =>
    props.$selected ? 'text-gray-dark' : 'text-gray-light'} ${(props) =>
  props.$order !== 'desc' && props.$selected ? '' : 'rotate-180'}`;

//#endregion

const Table = (props: ITableProps) => {
  return (
    <div>
      {props.title && (
        <Header>
          <Title>{props.title}</Title>
          {props.totalPage !== undefined &&
          props.page !== undefined &&
          props.onChangePage !== undefined ? (
            <Paging
              total={props.totalPage}
              page={props.page}
              onChange={props.onChangePage}
            />
          ) : (
            <></>
          )}
        </Header>
      )}
      <StyledTable>
        <thead>
          <StyledTableHeaderRow>
            {props.onClickAllSelected && (
              <StyledTableHeader onClick={props.onClickAllSelected}>
                <Checkbox
                  checked={props.isAllSelected}
                  disabled={props.isAllDisabled}
                />
              </StyledTableHeader>
            )}
            {props.tableHeader.map((item, index) => (
              <StyledTableHeader
                key={index}
                style={{
                  width: item.width,
                }}
                onClick={() => props.onSort(item.key)}
              >
                {item.label}
                <TriangleIcon
                  $selected={props.sort.key === item.key}
                  $order={props.sort.order}
                />
              </StyledTableHeader>
            ))}
          </StyledTableHeaderRow>
        </thead>
        <tbody>{props.children}</tbody>
      </StyledTable>
    </div>
  );
};

export default Table;
