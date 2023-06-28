import { purchases } from './MockupData';
import { getPagedData, getSortedData, requestMockupApi } from './util';
import { ISort } from '@/types/table';

export const getPurchases = async (
  statusFilter: string[],
  page: number,
  size: number,
  sort: ISort,
) => {
  const response: any = await requestMockupApi(
    'GET',
    getPagedData(
      getSortedData(
        purchases.filter((purchase) => statusFilter?.includes(purchase.status)),
        sort,
      ),
      page,
      size,
    ),
  );

  return response.data;
};

export const getPurchase = async (id: string) => {
  const response: any = await requestMockupApi(
    'GET',
    purchases.find((purchase) => purchase.id === Number(id)),
  );

  return response.data;
};

export const createPurchase = async (data: any) => {
  const response: any = await requestMockupApi('POST', data);

  return response.data;
};

export const updatePurchase = async (id: string, data: any) => {
  const response: any = await requestMockupApi('PUT', { id, data });

  return response.data;
};

export const deletePurchases = async (ids: string[]) => {
  const promises = ids.map(async (id) => {
    const response: any = await requestMockupApi('DELETE', id);

    return response.data;
  });
  await Promise.all(promises);
};
