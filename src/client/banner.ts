import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";

export interface IBanner {
  id: React.Key;
  title: string;
  content: string;
  imageUrl?: string;
  backgroundColor?: string;
  priority: number;
  visible: boolean;
  targetUrl?: string;
  createdDate: string;
  lastModifiedDate: string;
}

export interface IBannerFormValue extends Omit<IBanner, "id" | "createdDate" | "lastModifiedDate"> {}

export interface IBannersParams {
  title?: string;
  content?: string;
  visible?: boolean;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface IBannersResponse {
  content: IBanner[];
  pageable: IPageable;
}

export const useBanners = (params: IBannersParams = {}) => {
  return useSWR<IBannersResponse>(`/api/banner?${qs.stringify(params)}`);
};

export const useBanner = (id: React.Key) => {
  return useSWR<IBanner>(`/api/banner/${id}`);
};

export const createBanner = (value: IBannerFormValue) => {
  return fetchApi.post(`/api/banner`, { body: JSON.stringify(value) });
};

export const updateBanner = (id: React.Key, value: IBannerFormValue) => {
  return fetchApi.put(`/api/banner/${id}`, { body: JSON.stringify(value) });
};

export const deleteBanners = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.delete(`/api/banner/${id}`);
  }
  return Promise.resolve();
};
