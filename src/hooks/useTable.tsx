import { useRouter } from "next/router";
import { useCallback, useState } from "react";

const useTable = () => {
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const handleChangePage = useCallback(
    (pageNumber: number) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber },
      });
    },
    [router]
  );

  const handleChangeSort = useCallback(
    (sorter: any) => {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          sort: sorter.order ? `${sorter.field},${sorter.order === "ascend" ? "asc" : "desc"}` : undefined,
        },
      });
    },
    [router]
  );

  return {
    selectedRowKeys,
    onSelectChange,
    handleChangePage,
    handleChangeSort,
  };
};
export default useTable;
