import {
  IPayment,
  PaymentStatus,
  PaymentType,
  cancelUserPayments,
  getPaymentStateLabel,
  getPaymentTypeLabel,
  usePayments,
} from "@/client/payment";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import useTable from "@/hooks/useTable";
import { ISO8601DateTime } from "@/types/common";
import { Alert, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const PaymentList = () => {
  const router = useRouter();
  const { selectedRowKeys, onSelectChange, handleChangeSort, handleChangePage } = useTable();

  const { data, error, isLoading, mutate } = usePayments({
    userId: router.query.userId ? (router.query.userId as string) : undefined,
    type: router.query.type && router.query.type !== "ALL" ? (router.query.type as PaymentType) : undefined,
    status: router.query.status && router.query.status !== "ALL" ? (router.query.status as PaymentStatus) : undefined,
    fromApprovedDate: router.query.approvedDate
      ? (dayjs(router.query.approvedDate[0]).format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ") as string)
      : undefined,
    toApprovedDate: router.query.approvedDate
      ? (dayjs(router.query.approvedDate[1]).format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ") as string)
      : undefined,
    page: router.query.page ? Number(router.query.page) - 1 : 0,
    sort: router.query.sort ? String(router.query.sort) : undefined,
    size: 10,
  });

  const handleDelete = useCallback(
    async (ids: React.Key[]) => {
      try {
        await cancelUserPayments(ids as string[]);
        message.success("결제가 취소되었습니다.");
        onSelectChange([]);
        mutate();
      } catch (error) {
        message.error("결제 취소에 실패했습니다.");
      }
    },
    [mutate, onSelectChange]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IPayment> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: IPayment) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/payment/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              상세
            </Link>
            {record.status === "SUCCEEDED" && (
              <Popconfirm
                title="결제를 취소하시겠습니까?"
                onConfirm={() => handleDelete([record.id])}
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
      title: "회원명",
      dataIndex: "user.name",
      align: "center",
      sorter: true,
      render: (_value: string, record: IPayment) => {
        return (
          <Link href={`/user/edit/${record.user.id}`} className="text-black underline">
            {record.user.name} ({record.user.loginId.slice(9)})
          </Link>
        );
      },
    },

    {
      title: "가격",
      dataIndex: "price",
      align: "right",
      sorter: true,
      render: (value: number) => {
        return <span className="block">{value.toLocaleString()}원</span>;
      },
    },
    {
      title: "결제종류",
      dataIndex: "type",
      align: "center",
      sorter: true,
      render: (value: string, record: IPayment) => {
        return <span className="block">{getPaymentTypeLabel(record.type)}</span>;
      },
    },
    {
      title: "상태",
      dataIndex: "status",
      align: "center",
      sorter: true,
      render: (value: PaymentStatus) => {
        return <span className="block">{getPaymentStateLabel(value)}</span>;
      },
    },
    {
      title: "결제일시",
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
            title={`결제를 취소하시겠습니까?\n해당 결제는 복구할 수 없습니다.`}
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

      <DefaultTable<IPayment>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data?.content || []}
        loading={isLoading}
        pagination={{
          current: Number(router.query.page || 1),
          defaultPageSize: 10,
          total: data?.pageable.totalElements || 0,
          showSizeChanger: false,
          onChange: handleChangePage,
        }}
        onChange={(_pagination, _filters, sorter) => {
          handleChangeSort(sorter);
        }}
        showSorterTooltip={false}
        className="mt-3"
        countLabel={data?.pageable.totalElements || 0}
      />
    </>
  );
};

export default React.memo(PaymentList);
