import {
  IInquiry,
  InquiryStatus,
  InquiryType,
  getInquiryStatusLabel,
  getInquiryTypeLabel,
  useInquirys,
} from "@/client/inquiry";
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

const InquiryList = () => {
  const router = useRouter();
  const { selectedRowKeys, onSelectChange, handleChangeTableProps } = useTable();

  const { data, error, isLoading, mutate } = useInquirys({
    type: router.query.type && router.query.type !== "ALL" ? (router.query.type as InquiryType) : undefined,
    status: router.query.status && router.query.status !== "ALL" ? (router.query.status as InquiryStatus) : undefined,
    keyword: router.query.keyword ? String(router.query.keyword) : undefined,
    userId: router.query.userId ? String(router.query.userId) : undefined,
    page: router.query.page ? Number(router.query.page) - 1 : 0,
    sort: router.query.sort ? String(router.query.sort) : undefined,
    size: 10,
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IInquiry> = [
    {
      key: "action",
      width: 120,
      align: "center",
      render: (_value: unknown, record: IInquiry) => {
        return (
          <span className="flex justify-center gap-2">
            <Link href={`/user/inquiry/edit/${record.id}`} className="px-2 py-1 text-sm btn">
              상세
            </Link>
          </span>
        );
      },
    },
    {
      title: "문의 종류",
      width: 120,
      dataIndex: "type",
      sorter: true,
      align: "center",
      render: (value: InquiryType) => {
        return <span className="block">{getInquiryTypeLabel(value)}</span>;
      },
    },
    {
      title: "회원명",
      width: 200,
      dataIndex: "user.name",
      align: "center",
      sorter: true,
      render: (_value: string, record: IInquiry) => {
        return record.user ? (
          <Link href={`/user/user/edit/${record.user.id}`} className="text-black underline">
            {record.user.name} ({record.user.loginId.slice(9)})
          </Link>
        ) : (
          <span className="block">비회원</span>
        );
      },
    },
    {
      title: "내용",
      dataIndex: "content",
      align: "center",
      sorter: true,
      render: (value: string) => {
        return <span className="block truncate">{value}</span>;
      },
    },
    {
      title: "상태",
      width: 120,
      dataIndex: "status",
      align: "center",
      sorter: true,
      render: (value: InquiryStatus, record: IInquiry) => {
        return <span className="block">{getInquiryStatusLabel(record?.status)}</span>;
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
      render: (value?: ISO8601DateTime) => {
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
          <span style={{ marginLeft: 8 }}>{hasSelected ? `${selectedRowKeys.length}건 선택` : ""}</span>
        </div>

        <div className="flex-item-list"></div>
      </DefaultTableBtn>

      <DefaultTable<IInquiry>
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

export default React.memo(InquiryList);
