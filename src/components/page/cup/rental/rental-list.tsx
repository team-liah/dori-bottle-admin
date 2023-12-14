import { IRental, RentalStatus, cancelUserRentals, getRentalStateLabel, useRentals } from "@/client/rental";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import useTable from "@/hooks/useTable";
import { ISO8601DateTime } from "@/types/common";
import { getErrorMessage } from "@/utils/error";
import { Alert, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const RentalList = () => {
  const router = useRouter();
  const { selectedRowKeys, onSelectChange, handleChangeTableProps } = useTable();

  const { data, error, isLoading, mutate } = useRentals({
    no: router.query.searchType === "no" ? String(router.query.keyword) : undefined,
    expired: router.query.expired && router.query.expired !== "ALL" ? router.query.expired === "true" : undefined,
    status: router.query.status && router.query.status !== "ALL" ? (router.query.status as RentalStatus) : undefined,
    page: router.query.page ? Number(router.query.page) - 1 : 0,
    sort: router.query.sort ? String(router.query.sort) : undefined,
    size: 10,
  });

  const handleCancel = useCallback(
    async (ids: React.Key[]) => {
      try {
        await cancelUserRentals(ids as string[]);
        message.success("취소 처리되었습니다.");
        onSelectChange([]);
        mutate();
      } catch (e) {
        message.error(await getErrorMessage(e));
      }
    },
    [mutate, onSelectChange]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IRental> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: IRental) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/cup/rental/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              상세
            </Link>
            {!record.toMachine && (
              <Popconfirm
                title="취소 처리하시겠습니까?"
                onConfirm={() => handleCancel([record.id])}
                okText="예"
                cancelText="아니오"
              >
                <a className="px-2 py-1 text-sm btn">취소</a>
              </Popconfirm>
            )}
          </span>
        );
      },
    },
    {
      title: "No.",
      dataIndex: "no",
      sorter: true,
    },
    {
      title: "회원명",
      dataIndex: "user.name",
      align: "center",
      sorter: true,
      render: (_value: string, record: IRental) => {
        return (
          <Link href={`/user/edit/${record.user.id}`} className="text-black underline">
            {record.user.name} ({record.user.loginId.slice(9)})
          </Link>
        );
      },
    },
    {
      title: "사용 버블",
      dataIndex: "cost",
      align: "right",
      sorter: true,
      render: (value: number) => {
        return <span className="block">{value.toLocaleString()}개</span>;
      },
    },
    {
      title: "대여 위치",
      dataIndex: "fromMachine.name",
      align: "center",
      sorter: true,
      render: (_value: string, record: IRental) => {
        return record.fromMachine ? (
          <Link href={`/machine/vending/edit/${record.fromMachine.id}`} className="text-black underline">
            {record.fromMachine.name}
          </Link>
        ) : (
          <span className="block">-</span>
        );
      },
    },
    {
      title: "반납 위치",
      dataIndex: "toMachine.name",
      align: "center",
      sorter: true,
      render: (_value: string, record: IRental) => {
        return record.toMachine ? (
          <Link href={`/machine/vending/edit/${record.toMachine.id}`} className="text-black underline">
            {record.toMachine.name}
          </Link>
        ) : (
          <span className="block">-</span>
        );
      },
    },
    {
      title: "상태",
      dataIndex: "status",
      align: "center",
      sorter: true,
      render: (value: RentalStatus) => {
        return <span className="block">{getRentalStateLabel(value)}</span>;
      },
    },
    {
      title: "대여일시",
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
      title: "반납일시",
      dataIndex: "succeededDate",
      align: "center",
      width: 120,
      sorter: true,
      render: (value?: ISO8601DateTime) => {
        return (
          <div className="text-sm">
            {value ? (
              <>
                <span className="block">{dayjs(value).format("YYYY/MM/DD")}</span>
                <span className="block">{dayjs(value).format("HH:mm")}</span>
              </>
            ) : (
              <span className="block">-</span>
            )}
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
            title={`대여를 취소하시겠습니까?\n해당 대여는 복구할 수 없습니다.`}
            disabled={!hasSelected}
            onConfirm={() => handleDelete(selectedRowKeys)}
            okText="예"
            cancelText="아니오"
          >
            <Button type="default" disabled={!hasSelected}>
              일괄 취소
            </Button>
          </Popconfirm> */}

          <span style={{ marginLeft: 8 }}>{hasSelected ? `${selectedRowKeys.length}건 선택` : ""}</span>
        </div>

        <div className="flex-item-list"></div>
      </DefaultTableBtn>

      <DefaultTable<IRental>
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
        countLabel={data?.pageable.totalElements || 0}
      />
    </>
  );
};

export default React.memo(RentalList);
