import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";

export type GroupType = "UNIVERSITY" | "COMPANY";
export const GROUP_TYPES: GroupType[] = ["UNIVERSITY", "COMPANY"];
export interface IGroup {
  id: React.Key;
  name: string;
  type: GroupType;
  discountRate: number;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface IGroupFormValue extends Omit<IGroup, "id" | "createdDate" | "lastModifiedDate"> {}

export interface IGroupsParams {
  name?: string;
  type?: GroupType;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface IGroupsResponse {
  content: IGroup[];
  pageable: IPageable;
}

export const useGroups = (params: IGroupsParams = {}) => {
  return useSWR<IGroupsResponse>(`/api/group?${qs.stringify(params)}`);
};

export const useGroup = (id: React.Key) => {
  return useSWR<IGroup>(`/api/group/${id}`);
};

export const createGroup = (value: IGroupFormValue) => {
  return fetchApi.post("/api/group", { body: JSON.stringify(value) });
};

export const updateGroup = (id: React.Key, value: IGroupFormValue) => {
  return fetchApi.put(`/api/group/${id}`, { body: JSON.stringify(value) });
};

export const deleteGroups = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.delete(`/api/group/${id}`);
  }

  return Promise.resolve();
};

export const setUserGroup = (userId: React.Key, groupId: React.Key) => {
  return fetchApi.post(`/api/group/${groupId}/user/${userId}`);
};

export const deleteUserGroup = (userId: React.Key, groupId: React.Key) => {
  return fetchApi.delete(`/api/group/${groupId}/user/${userId}`);
};

export const getGroupTypeLabel = (type?: GroupType) => {
  switch (type) {
    case "UNIVERSITY":
      return "대학교";
    case "COMPANY":
      return "회사";
    default:
      return "";
  }
};
