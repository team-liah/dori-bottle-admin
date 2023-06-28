import { useState } from 'react';
import { ISort, ITableHeaderItem } from '@/types/table';

const useSort = (headerList: ITableHeaderItem[]) => {
  const [sort, setSort] = useState<ISort>({
    key: headerList[0]?.key || 'id',
    order: 'desc',
  });

  const handleSort = (key: string) => {
    if (sort.key === key) {
      setSort({
        key,
        order: sort.order === 'desc' ? 'asc' : 'desc',
      });
    } else {
      setSort({
        key,
        order: 'desc',
      });
    }
  };

  return { sort, handleSort };
};

export default useSort;
