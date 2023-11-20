import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";

export interface IBubble {
  id: React.Key;
  amounts: number;
  price: number;
  discountRate: number;
  discountPrice: number;
  discountExpiredDate: string;
  expiredDate: string;
}

export interface IBubbleFormValue extends Omit<IBubble, "id"> {}

export interface IBubblesParams {
  expired?: boolean;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface IBubblesResponse {
  content: IBubble[];
  pageable: IPageable;
}

export const useBubbles = (params: IBubblesParams = {}) => {
  return useSWR<IBubblesResponse>(`/api/payment/category?${qs.stringify(params)}`);
};

export const useBubble = (id: React.Key) => {
  return useSWR<IBubble>(`/api/payment/category?${qs.stringify(id)}`);
};

export const createBubble = (value: IBubbleFormValue) => {
  return fetchApi.post("/api/payment/category", { body: JSON.stringify(value) });
};

export const updateBubble = (id: React.Key, value: IBubbleFormValue) => {
  return fetchApi.put(`/api/payment/category/${id}`, { body: JSON.stringify(value) });
};

export const deleteBubbles = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.delete(`/api/payment/category/${id}`);
  }

  return Promise.resolve();
};
