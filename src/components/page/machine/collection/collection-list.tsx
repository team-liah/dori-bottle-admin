import { IMachine, MachineState, deleteMachines, getMachineStateLabel, useMachines } from "@/client/machine";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { ISO8601DateTime } from "@/types/common";
import { Alert, Button, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

const CollectionList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();

  const { data, error, isLoading, mutate } = useMachines({
    type: "COLLECTION",
    state: router.query.state && router.query.state !== "ALL" ? (router.query.state as MachineState) : undefined,
    no: router.query.searchType === "no" ? String(router.query.keyword) : undefined,
    name: router.query.searchType === "name" ? String(router.query.keyword) : undefined,
    addressKeyword: router.query.searchType === "address" ? String(router.query.keyword) : undefined,
    page: router.query.page ? Number(router.query.page) - 1 : 0,
    size: 5,
  });

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber },
      });
    },
    [router]
  );

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const handleDelete = useCallback(
    async (ids: React.Key[]) => {
      try {
        await deleteMachines(ids);
        message.success("반납함가 삭제되었습니다.");
        setSelectedRowKeys([]);
        mutate();
      } catch (error) {
        message.error("반납함 삭제에 실패했습니다.");
      }
    },
    [mutate]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IMachine> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: IMachine) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/machine/collection/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="반납함을 삭제하시겠습니까?"
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
      title: "No.",
      dataIndex: "no",
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "상태",
      dataIndex: "state",
      render: (value: MachineState) => {
        return <span className="block">{getMachineStateLabel(value)}</span>;
      },
    },
    {
      title: "컵 개수",
      dataIndex: "cupAmounts",
      render: (_value: unknown, record: IMachine) => {
        const percentage = (record.cupAmounts / record.capacity) * 100;
        return (
          <div>
            <span className={`block ${percentage > 80 ? "text-rose-600" : percentage > 50 ? "text-yellow-800" : ""}`}>
              {record.cupAmounts} / {record.capacity}개 ({percentage}%)
            </span>
          </div>
        );
      },
    },
    {
      title: "생성일시",
      dataIndex: "createdDate",
      align: "center",
      width: 120,
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
            title="반납함을 삭제하시겠습니까?"
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
          <Button type="primary" onClick={() => router.push("/machine/collection/new")}>
            반납함 등록
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<IMachine>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.content || []}
        loading={isLoading}
        pagination={{
          current: Number(router.query.page || 1),
          defaultPageSize: 5,
          total: data?.pageable.totalElements || 0,
          showSizeChanger: false,
          onChange: handleChangePage,
        }}
        className="mt-3"
        countLabel={data?.pageable.totalElements || 0}
      />
    </>
  );
};

export default React.memo(CollectionList);
