import { IGroup } from "@/client/group";
import { Gender, IUser, useUsers } from "@/client/user";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import useTable from "@/hooks/useTable";
import { ISO8601DateTime } from "@/types/common";
import { Alert } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const UserList = () => {
  const router = useRouter();
  const { selectedRowKeys, onSelectChange, handleChangeTableProps } = useTable();

  const { data, error, isLoading, mutate } = useUsers({
    active: router.query.active === "true" ? true : router.query.active === "false" ? false : undefined,
    blocked: router.query.blocked === "true" ? true : router.query.blocked === "false" ? false : undefined,
    gender: router.query.gender !== "ALL" ? (router.query.gender as Gender) : undefined,
    name: router.query.searchType === "name" ? String(router.query.keyword) : undefined,
    groupId: router.query.groupId !== "ALL" ? (router.query.groupId as React.Key) : undefined,
    phoneNumber: router.query.searchType === "phoneNumber" ? String(router.query.keyword) : undefined,
    sort: router.query.sort ? String(router.query.sort) : undefined,
    page: router.query.page ? Number(router.query.page) - 1 : 0,
    size: 10,
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IUser> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: IUser) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/user/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
          </span>
        );
      },
    },
    {
      title: "이름",
      dataIndex: "name",
      sorter: true,
      render: (value: string) => {
        return <div>{`${value}` || "-"}</div>;
      },
    },
    {
      title: "전화번호",
      dataIndex: "loginId",
      sorter: true,
      render: (_value: string) => {
        return <span>{_value || "-"}</span>;
      },
    },
    {
      title: "그룹",
      dataIndex: "group",
      sorter: true,
      render: (_value: IGroup) => {
        return _value ? (
          <span className="underline" onClick={() => router.push(`/group/edit/${_value.id}`)}>
            {_value.name}
          </span>
        ) : (
          <span>-</span>
        );
      },
    },
    {
      title: "상태",
      dataIndex: "active, blocked",
      align: "center",
      sorter: true,
      render: (_value: IGroup, record: IUser) => {
        return <span>{!record.active ? "비활성" : record.blocked ? "BLOCKED" : "활성"}</span>;
      },
    },
    {
      title: "생성일시",
      dataIndex: "createdDate",
      align: "center",
      width: 120,
      sorter: true,
      render: (value: ISO8601DateTime) => {
        return (
          <div className="text-sm">
            <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
            <span className="block">{dayjs(value).format("HH:mm")}</span>
          </div>
        );
      },
    },
    {
      title: "수정일시",
      dataIndex: "lastModifiedDate",
      align: "center",
      width: 120,
      sorter: true,
      render: (value: ISO8601DateTime) => {
        return (
          <div className="text-sm">
            <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
            <span className="block">{dayjs(value).format("HH:mm")}</span>
          </div>
        );
      },
    },
  ];

  if (error) {
    return <Alert message="데이터 로딩 중 오류가 발생했습니다." type="warning" />;
  }

  return (
    <>
      <DefaultTableBtn className="justify-between">
        <div>
          {/* <Popconfirm
            title="회원을 삭제하시겠습니까?"
            disabled={!hasSelected}
            onConfirm={() => handleDelete(selectedRowKeys)}
            okText="예"
            cancelText="아니오"
          >
            <Button type="default" disabled={!hasSelected}>
              일괄 삭제
            </Button>
          </Popconfirm> */}

          <span style={{ marginLeft: 8 }}>{hasSelected ? `${selectedRowKeys.length}건 선택` : ""}</span>
        </div>

        {/* <div className="flex-item-list">
          <Button type="primary" onClick={() => router.push("/user/new")}>
            회원 등록
          </Button>
        </div> */}
      </DefaultTableBtn>

      <DefaultTable<IUser>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.content || []}
        loading={isLoading}
        pagination={{
          current: Number(router.query.page || 1),
          defaultPageSize: 10,
          total: data?.pageable.totalElements || 0,
          showSizeChanger: false,
        }}
        onChange={handleChangeTableProps}
        showSorterTooltip={false}
        className="mt-3"
        countLabel={data?.pageable.totalElements}
      />
    </>
  );
};

export default React.memo(UserList);
