import { TablePaginationConfig } from "antd";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const useTable = () => {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const handleChangeTableProps = useCallback(
    (pagination: TablePaginationConfig, filter: any, sorter: any) => {
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          page: pagination.current,
          sort: sorter.order ? `${sorter.field},${sorter.order === "ascend" ? "asc" : "desc"}` : undefined,
        },
      });
    },
    [router]
  );

  return {
    selectedRowKeys,
    onSelectChange,
    handleChangeTableProps,
  };
};
export default useTable;
