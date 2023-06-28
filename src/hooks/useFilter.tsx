import { ISort } from '@/types/table';

const useFilter = () => {
  const getFilteredData = (data: any[], keyword: string) => {
    if (keyword === '') {
      return data;
    } else {
      return data?.filter(
        (item) =>
          item.name?.toLowerCase().includes(keyword.toLowerCase()) ||
          item.email?.toLowerCase().includes(keyword.toLowerCase()) ||
          item.contents?.toLowerCase().includes(keyword.toLowerCase()) ||
          item.description?.toLowerCase().includes(keyword.toLowerCase()),
      );
    }
  };

  const getSortedData = (data: any[], sort: ISort) => {
    return data?.sort((a, b) => {
      if (sort.order === 'asc') {
        if (a[sort.key] < b[sort.key]) {
          return -1;
        } else if (a[sort.key] > b[sort.key]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a[sort.key] < b[sort.key]) {
          return 1;
        } else if (a[sort.key] > b[sort.key]) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  };

  const getPagedData = (data: any[], page: number, pageSize: number) => {
    const startIndex = page * pageSize;

    return data?.slice(startIndex, startIndex + pageSize);
  };

  return { getFilteredData, getSortedData, getPagedData };
};

export default useFilter;
