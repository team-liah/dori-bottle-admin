import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "./base";
import { ICup } from "./cup";
import { IMachine } from "./machine";
import { IPageable } from "./pageable";
import { IUser } from "./user";

export type RentalStatus = "PROCEEDING" | "CONFIRMED" | "SUCCEEDED" | "FAILED" | "CANCELED";
export const RENTAL_STATUSES: RentalStatus[] = ["PROCEEDING", "CONFIRMED", "SUCCEEDED", "FAILED", "CANCELED"];

export interface IRental {
  id: React.Key;
  no: string;
  user: IUser;
  cup: ICup;
  fromMachine: IMachine;
  toMachine: IMachine;
  withIce: boolean;
  cost: number;
  succeededDate?: string;
  expiredDate: string;
  status: RentalStatus;
  createdDate: string;
  lastModifiedDate: string;
}

export interface IRentalsParams {
  no?: string;
  userId?: React.Key;
  cupId?: React.Key;
  fromMachineId?: React.Key;
  toMachineId?: React.Key;
  status?: RentalStatus;
  expired?: boolean;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface IRentalsResponse {
  content: IRental[];
  pageable: IPageable;
}

export interface IReturnRentalFormValue {
  machineNo: React.Key;
  cupRfid: string;
}

export const useRentals = (params: IRentalsParams = {}) => {
  return useSWR<IRentalsResponse>(`/api/rental?${qs.stringify(params)}`);
};

export const useRental = (id?: React.Key) => {
  return useSWR<IRental>(id ? `/api/rental/${id}` : null);
};

export const cancelUserRentals = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.post(`/api/rental/${id}/cancel`);
  }

  return Promise.resolve();
};

export const returnUserRentals = (value: IReturnRentalFormValue) => {
  return fetchApi.post("/api/rental/return", { body: JSON.stringify(value) });
};

export const getRentalStateLabel = (state?: RentalStatus) => {
  switch (state) {
    case "PROCEEDING":
      return "처리 중";
    case "CONFIRMED":
      return "대여 중";
    case "SUCCEEDED":
      return "반납 완료";
    case "FAILED":
      return "분실";
    case "CANCELED":
      return "대여 취소";
    default:
      return "";
  }
};
