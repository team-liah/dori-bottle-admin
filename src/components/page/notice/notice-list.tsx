import { INotice, deleteNotices, useNotices } from "@/client/notice";
import DefaultTable from "@/components/shared/ui/default-table";
import DefaultTableBtn from "@/components/shared/ui/default-table-btn";
import { ISO8601DateTime } from "@/types/common";
import { Alert, Button, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

const NoticeList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const router = useRouter();

  const { data, error, isLoading, mutate } = useNotices({
    page: router.query.page ? Number(router.query.page) - 1 : 0,
    keyword: router.query.keyword as string,
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
        await deleteNotices(ids);
        message.success("공지사항이 삭제되었습니다.");
        setSelectedRowKeys([]);
        mutate();
      } catch (error) {
        message.error("공지사항 삭제에 실패했습니다.");
      }
    },
    [mutate]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<INotice> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: INotice) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/notice/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="공지사항을 삭제하시겠습니까?"
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
      title: "제목",
      dataIndex: "title",
    },
    {
      title: "작성자",
      dataIndex: "author",
      width: 200,
      render: (_value: unknown, record: INotice) => {
        return (
          <div className="flex flex-row items-center gap-2">
            <span className="text-sm">
              <span className="block">{record.author.name}</span>
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
            title="공지사항을 삭제하시겠습니까?"
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
          <Button type="primary" onClick={() => router.push("/notice/new")}>
            공지사항 등록
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<INotice>
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

export default React.memo(NoticeList);