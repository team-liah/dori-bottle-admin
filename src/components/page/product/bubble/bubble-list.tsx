import { IBubble, deleteBubbles, useBubbles } from "@/client/product";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { ISO8601DateTime } from "@/types/common";
import { Alert, Button, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

const BubbleList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();

  const { data, error, isLoading, mutate } = useBubbles({
    expired: router.query.status === "true" ? true : router.query.status === "false" ? false : undefined,
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
        await deleteBubbles(ids as number[]);
        message.success("상품 삭제가 완료되었습니다.");
        setSelectedRowKeys([]);
        mutate();
      } catch (error) {
        message.error("상품 삭제에 실패했습니다.");
      }
    },
    [mutate]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IBubble> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: IBubble) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/product/bubble/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="상품을 삭제하시겠습니까?"
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
      title: "개수",
      dataIndex: "amounts",
      align: "right",
      render: (value: number) => {
        return <span>{value.toLocaleString()}</span>;
      },
    },
    {
      title: "가격",
      dataIndex: "price",
      align: "right",
      render: (value: number, record: IBubble) => {
        return (
          <span>
            {!dayjs(record.discountExpiredDate).isBefore(dayjs())
              ? record.discountPrice.toLocaleString()
              : record.price.toLocaleString()}
            원
            {record.discountRate > 0 && !dayjs(record.discountExpiredDate).isBefore(dayjs()) && (
              <span className="block text-xs text-gray-400">(할인율 {record.discountRate.toLocaleString()}%)</span>
            )}
          </span>
        );
      },
    },
    {
      title: "상태",
      dataIndex: "expiredDate",
      align: "center",
      width: 120,
      render: (value: ISO8601DateTime) => {
        return (
          <span>
            {dayjs(value).isBefore(dayjs()) ? (
              <span className="text-red-500">만료</span>
            ) : (
              <span className="text-green-500">판매중</span>
            )}
          </span>
        );
      },
    },
    {
      title: "만료일시",
      dataIndex: "expiredDate",
      align: "center",
      width: 120,
      render: (value: ISO8601DateTime) => {
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
    {
      title: "생성일시",
      dataIndex: "createdDate",
      align: "center",
      width: 120,
      render: (value: ISO8601DateTime) => {
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
    {
      title: "수정일시",
      dataIndex: "lastModifiedDate",
      align: "center",
      width: 120,
      render: (value: ISO8601DateTime) => {
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
          <Popconfirm
            title="상품을 삭제하시겠습니까?"
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
          <Button type="primary" onClick={() => router.push("/product/bubble/new")}>
            상품 등록
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<IBubble>
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

export default React.memo(BubbleList);
