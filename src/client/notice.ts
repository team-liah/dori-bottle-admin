import qs from "qs";
import useSWR from "swr";
import { IAdmin } from "./admin";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";

type NoticeType = "NOTICE" | "FAQ";

export interface INotice {
  id: React.Key;
  author: IAdmin;
  type: NoticeType;
  title: string;
  content: string;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface INoticeFormValue extends Omit<INotice, "id" | "createdDate" | "lastModifiedDate"> {}

export interface INoticesParams {
  authorId?: React.Key;
  type?: NoticeType;
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface INoticesResponse {
  content: INotice[];
  pageable: IPageable;
}

export const useNotices = (params: INoticesParams = {}) => {
  return useSWR<INoticesResponse>(`/api/post?${qs.stringify(params)}`);
};

export const useNotice = (id: React.Key) => {
  return useSWR<INotice>(`/api/post/${id}`);
};

export const createNotice = (value: INoticeFormValue) => {
  return fetchApi.post(`/api/post`, { body: JSON.stringify(value) });
};

export const updateNotice = (id: React.Key, value: INoticeFormValue) => {
  return fetchApi.patch(`/api/post/${id}`, { body: JSON.stringify(value) });
};

export const deleteNotices = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.delete(`/api/post/${id}`);
  }
  return Promise.resolve();
};
