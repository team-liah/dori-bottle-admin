import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "./base";
import { IGroup } from "./group";
import { IPageable } from "./pageable";
import { IBlockCause, IPenalty } from "./penalty";

export type Gender = "MALE" | "FEMALE";
export const GENDERS: Gender[] = ["MALE", "FEMALE"];

export interface IUser {
  id: React.Key;
  loginId: string;
  name: string;
  active: boolean;
  phoneNumber?: string;
  invitationCode?: string;
  invitationCount?: number;
  inviterId?: React.Key;
  birthDate?: string;
  description?: string;
  gender?: Gender;
  registeredDate?: string;
  group?: IGroup;
  penalties?: IPenalty[];
  blocked?: boolean;
  blockedCauses?: IBlockCause[];
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface IUsersParams {
  name?: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: Gender;
  active?: boolean;
  blocked?: boolean;
  groupId?: React.Key;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface IUsersResponse {
  content: IUser[];
  pageable: IPageable;
}

export interface IUserFormValue {
  description?: string;
  groupId?: React.Key | null;
}

export const useUsers = (params: IUsersParams = {}) => {
  return useSWR<IUsersResponse>(`/api/user?${qs.stringify(params)}`);
};

export const useUser = (id: React.Key) => {
  return useSWR<IUser>(`/api/user/${id}`);
};

export const updateUser = (id: React.Key, value: IUserFormValue) => {
  return fetchApi.put(`/api/user/${id}`, { body: JSON.stringify(value) });
};

export const getUserGenderLabel = (gender?: Gender) => {
  switch (gender) {
    case "MALE":
      return "남성";
    case "FEMALE":
      return "여성";
    default:
      return "";
  }
};
