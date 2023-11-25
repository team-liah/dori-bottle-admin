import { CupStatus, ICup, ICupFormValue, createCup, deleteCups, getCupStateLabel, useCups } from "@/client/cup";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import useNFCReader from "@/hooks/useNFCReader";
import { ISO8601DateTime } from "@/types/common";
import { getErrorMessage } from "@/utils/error";
import { Alert, Button, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

const CupList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();
  const { scanning, onScanning, stopScanning } = useNFCReader();

  const { data, error, isLoading, mutate } = useCups({
    rfid: router.query.searchType === "rfid" ? String(router.query.keyword) : undefined,
    status: router.query.status && router.query.status !== "ALL" ? (router.query.status as CupStatus) : undefined,
    page: router.query.page ? Number(router.query.page) - 1 : 0,
    size: 10,
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

  const handleScan = useCallback(
    async (formValue: ICupFormValue) => {
      try {
        await createCup(formValue);
        message.success(`${formValue.rfid} 등록되었습니다`);
        mutate();
      } catch (e: unknown) {
        message.error(await getErrorMessage(e));
      }
    },
    [mutate]
  );

  const handleDelete = useCallback(
    async (ids: React.Key[]) => {
      try {
        await deleteCups(ids as string[]);
        message.success("컵이 삭제되었습니다.");
        setSelectedRowKeys([]);
        mutate();
      } catch (error) {
        message.error("컵 삭제에 실패했습니다.");
      }
    },
    [mutate]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<ICup> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: ICup) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/cup/cup/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="컵을 삭제하시겠습니까?"
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
      title: "RFID.",
      dataIndex: "rfid",
    },
    {
      title: "상태",
      dataIndex: "status",
      render: (value: CupStatus) => {
        return <span className="block">{getCupStateLabel(value)}</span>;
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
            title="컵을 삭제하시겠습니까?"
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
          <Button type="primary" onClick={() => router.push("/cup/cup/new")}>
            컵 등록
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (scanning) {
                stopScanning();
              } else {
                onScanning((serialNumber) => handleScan({ rfid: serialNumber }));
              }
            }}
          >
            {scanning ? "취소" : "컵 스캔"}
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<ICup>
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
        className="mt-3"
        countLabel={data?.pageable.totalElements || 0}
      />
    </>
  );
};

export default React.memo(CupList);
