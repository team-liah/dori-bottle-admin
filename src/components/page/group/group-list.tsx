import { GroupType, IGroup, deleteGroups, getGroupTypeLabel, useGroups } from "@/client/group";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import useTable from "@/hooks/useTable";
import { ISO8601DateTime } from "@/types/common";
import { Alert, Button, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const GroupList = () => {
  const router = useRouter();
  const { selectedRowKeys, onSelectChange, handleChangeTableProps } = useTable();

  const { data, error, isLoading, mutate } = useGroups({
    page: router.query.page ? Number(router.query.page) - 1 : 0,
    name: router.query.searchType === "name" ? String(router.query.keyword) : undefined,
    type: router.query.type && router.query.type !== "ALL" ? (router.query.type as GroupType) : undefined,
    sort: router.query.sort ? String(router.query.sort) : undefined,
    size: 10,
  });

  const handleDelete = useCallback(
    async (ids: React.Key[]) => {
      try {
        await deleteGroups(ids);
        message.success("기관이 삭제되었습니다.");
        onSelectChange([]);
        mutate();
      } catch (error) {
        message.error("기관 삭제에 실패했습니다.");
      }
    },
    [mutate, onSelectChange]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IGroup> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: IGroup) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/group/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="기관을 삭제하시겠습니까?"
              onConfirm={() => handleDelete([record.id])}
              okText="예"
              cancelText="아니오"
            >
              <a className="px-2 py-1 text-sm btn">삭제</a>
            </Popconfirm>
          </span>
        );
      },
    },
    {
      title: "이름",
      dataIndex: "name",
      sorter: true,
      render: (value: string) => {
        return <span>{value || "-"}</span>;
      },
    },
    {
      title: "할인율",
      dataIndex: "discountRate",
      align: "center",
      width: 120,
      sorter: true,
      render: (value: number) => {
        return <span>{`${value}%` || "-"}</span>;
      },
    },
    {
      title: "기관 종류",
      dataIndex: "type",
      align: "center",
      width: 120,
      sorter: true,
      render: (value: GroupType) => {
        return <span>{getGroupTypeLabel(value) || "-"}</span>;
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
          <Popconfirm
            title="기관을 삭제하시겠습니까?"
            disabled={!hasSelected}
            onConfirm={() => handleDelete(selectedRowKeys)}
            okText="예"
            cancelText="아니오"
          >
            <Button type="default" disabled={!hasSelected}>
              일괄 삭제
            </Button>
          </Popconfirm>

          <span style={{ marginLeft: 8 }}>{hasSelected ? `${selectedRowKeys.length}건 선택` : ""}</span>
        </div>

        <div className="flex-item-list">
          <Button type="primary" onClick={() => router.push("/group/new")}>
            기관 등록
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<IGroup>
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

export default React.memo(GroupList);
