import qs from 'qs';
import useSWR from 'swr';
import { fetchApi } from './base';

export interface IAdmin {
  id: React.Key;
  loginId: string;
  password?: string;
  confirmPassword?: string;
  name: string;
  email: string;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface IAdminFormValue
  extends Omit<IAdmin, 'id' | 'createdDate' | 'lastModifiedDate'> {}

export interface IAdminsParams {
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface IAdminsResponse {
  content: IAdmin[];
  totalElements: number;
  totalPages: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const useAdmins = (params: IAdminsParams = {}) => {
  return useSWR<IAdminsResponse>(`/api/admin?${qs.stringify(params)}`);
};

export const useAdmin = (id: React.Key) => {
  return useSWR<IAdmin>(`/api/admin/${id}`);
};

export const createAdmin = (value: IAdminFormValue) => {
  return fetchApi.post('/api/admin', { body: JSON.stringify(value) });
};

export const updateAdmin = (id: React.Key, value: IAdminFormValue) => {
  return fetchApi.patch(`/api/admin/${id}`, { body: JSON.stringify(value) });
};

export const deleteAdmins = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.delete(`/api/admin/${id}`);
  }

  return Promise.resolve();
};
