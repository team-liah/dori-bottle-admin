import { Checkbox } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomComponent';
import { ITableHeaderItem } from '@/types/table';
import { IUser } from '@/types/user';

interface IUserTableRowProps {
  isSelected: boolean;
  item: IUser;
  tableHeader: ITableHeaderItem[];
  onSelect: () => void;
}

//#region Styled Component

const Tag = tw.div<{ $color: string }>`
  w-fit px-2 py-1 text-xs text-white rounded-[3px] ${(props) =>
    props.$color === 'green' ? 'bg-[#87d068]' : 'bg-[#e66767]'}`;

//#endregion

const UserTableRow = (props: IUserTableRowProps) => {
  const router = useRouter();

  return (
    <Custom.StyledTableRow onClick={props.onSelect}>
      <Custom.StyledTableData>
        <Checkbox checked={props.isSelected} />
      </Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.id}</Custom.StyledTableData>
      <Custom.StyledTableData
        $link={true}
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/user/user/${props.item.id}`);
        }}
      >
        {props.item.name}
      </Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.email}</Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.phone}</Custom.StyledTableData>
      <Custom.StyledTableData>
        {props.item.authorities.includes('ROLE_ADMIN') ? (
          <Tag $color="red">관리자</Tag>
        ) : (
          <Tag $color="green">일반 사용자</Tag>
        )}
      </Custom.StyledTableData>
      <Custom.StyledTableData>{props.item.createdDate}</Custom.StyledTableData>
    </Custom.StyledTableRow>
  );
};

export default UserTableRow;
