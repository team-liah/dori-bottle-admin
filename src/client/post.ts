import qs from "qs";
import useSWR from "swr";
import { IAdmin } from "./admin";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";

type PostType = "NOTICE" | "FAQ";

export interface IPost {
  id: React.Key;
  author: IAdmin;
  type: PostType;
  title: string;
  content: string;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface IPostFormValue extends Omit<IPost, "id" | "createdDate" | "lastModifiedDate"> {}

export interface IPostsParams {
  authorId?: React.Key;
  type?: PostType;
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface IPostsResponse {
  content: IPost[];
  pageable: IPageable;
}

export const usePosts = (params: IPostsParams = {}) => {
  return useSWR<IPostsResponse>(`/api/post?${qs.stringify(params)}`);
};

export const usePost = (id: React.Key) => {
  return useSWR<IPost>(`/api/post/${id}`);
};

export const createPost = (value: IPostFormValue) => {
  return fetchApi.post(`/api/post`, { body: JSON.stringify(value) });
};

export const updatePost = (id: React.Key, value: IPostFormValue) => {
  return fetchApi.patch(`/api/post/${id}`, { body: JSON.stringify(value) });
};

export const deletePosts = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.delete(`/api/post/${id}`);
  }
  return Promise.resolve();
};
