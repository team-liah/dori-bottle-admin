import { IBanner, deleteBanners, useBanners } from "@/client/banner";
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

const BannerList = () => {
  const router = useRouter();
  const { selectedRowKeys, onSelectChange, handleChangeTableProps } = useTable();

  const { data, error, isLoading, mutate } = useBanners({
    title: router.query.searchType === "title" ? String(router.query.keyword) : undefined,
    content: router.query.searchType === "content" ? String(router.query.keyword) : undefined,
    visible: router.query.visible && router.query.visible !== "ALL" ? router.query.visible === "true" : undefined,
    page: router.query.page ? Number(router.query.page) - 1 : 0,
    sort: router.query.sort ? String(router.query.sort) : undefined,
    size: 10,
  });

  const handleDelete = useCallback(
    async (ids: React.Key[]) => {
      try {
        await deleteBanners(ids);
        message.success("배너가 삭제되었습니다.");
        onSelectChange([]);
        mutate();
      } catch (error) {
        message.error("배너 삭제에 실패했습니다.");
      }
    },
    [mutate, onSelectChange]
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IBanner> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: IBanner) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/post/banner/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              수정
            </Link>
            <Popconfirm
              title="배너를 삭제하시겠습니까?"
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
      sorter: true,
      render: (value: string) => {
        return <span className="block truncate">{value}</span>;
      },
    },
    {
      title: "순위",
      dataIndex: "priority",
      align: "center",
      width: 120,
      sorter: true,
    },
    {
      title: "노출여부",
      dataIndex: "visible",
      align: "center",
      width: 120,
      sorter: true,
      render: (value: boolean) => {
        return value ? "정상" : "숨김";
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
            title="배너를 삭제하시겠습니까?"
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
          <Button type="primary" onClick={() => router.push("/post/banner/new")}>
            배너 등록
          </Button>
        </div>
      </DefaultTableBtn>

      <DefaultTable<IBanner>
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

export default React.memo(BannerList);
