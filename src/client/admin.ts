import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";

export type AdminRole = "ADMIN" | "MACHINE_ADMIN" | "INSTITUTION";
export const ADMIN_ROLES: AdminRole[] = ["ADMIN", "MACHINE_ADMIN", "INSTITUTION"];
export interface IAdmin {
  id: React.Key;
  loginId: string;
  loginPassword?: string;
  confirmPassword?: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  description?: string;
  role: AdminRole;
  deleted: boolean;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface IAdminFormValue extends Omit<IAdmin, "id" | "createdDate" | "lastModifiedDate"> {}

export interface IAdminPasswordFormValue extends Pick<IAdmin, "loginPassword" | "confirmPassword"> {}

export interface IAdminsParams {
  loginId?: string;
  name?: string;
  role?: AdminRole;
  deleted?: boolean;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface IAdminsResponse {
  content: IAdmin[];
  pageable: IPageable;
}

export const useAdmins = (params: IAdminsParams = {}) => {
  return useSWR<IAdminsResponse>(`/api/admin?${qs.stringify(params)}`);
};

export const useAdmin = (id: React.Key) => {
  return useSWR<IAdmin>(`/api/admin/${id}`);
};

export const createAdmin = (value: IAdminFormValue) => {
  return fetchApi.post("/api/admin", { body: JSON.stringify(value) });
};

export const updateAdmin = (id: React.Key, value: IAdminFormValue) => {
  return fetchApi.put(`/api/admin/${id}`, { body: JSON.stringify(value) });
};

export const updateAdminPassword = (id: React.Key, value: IAdminPasswordFormValue) => {
  return fetchApi.put(`/api/admin/${id}/password`, { body: JSON.stringify(value) });
};

export const deleteAdmins = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.delete(`/api/admin/${id}`);
  }

  return Promise.resolve();
};

export const getAdminRoleLabel = (role?: AdminRole) => {
  switch (role) {
    case "ADMIN":
      return "전체 관리자";
    case "MACHINE_ADMIN":
      return "자판기 관리자";
    case "INSTITUTION":
      return "기관 관리자";
    default:
      return "";
  }
};
