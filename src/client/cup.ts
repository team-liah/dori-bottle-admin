import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";

export type CupStatus = "AVAILABLE" | "ON_LOAN" | "RETURNED" | "WASHING" | "LOST" | "DAMAGED";
export const CUP_STATUSES: CupStatus[] = ["AVAILABLE", "ON_LOAN", "RETURNED", "WASHING", "LOST", "DAMAGED"];

export interface ICup {
  id: React.Key;
  rfid: string;
  status?: string;
  createdDate?: string;
  lastModifiedDate?: string;
}

export interface ICupFormValue extends Omit<ICup, "id"> {}

export interface ICupsParams {
  status?: CupStatus;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface ICupsResponse {
  content: ICup[];
  pageable: IPageable;
}

export const useCups = (params: ICupsParams = {}) => {
  return useSWR<ICupsResponse>(`/api/cup?${qs.stringify(params)}`);
};

export const useCup = (id: React.Key) => {
  return useSWR<ICup>(`/api/cup/${id}`);
};

export const createCup = (value: ICupFormValue) => {
  return fetchApi.post("/api/cup", { body: JSON.stringify(value) });
};

export const updateCup = (id: React.Key, value: ICupFormValue) => {
  return fetchApi.put(`/api/cup/${id}`, { body: JSON.stringify(value) });
};

export const deleteCups = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.delete(`/api/cup/${id}`);
  }

  return Promise.resolve();
};

export const getCupStateLabel = (state?: CupStatus) => {
  switch (state) {
    case "AVAILABLE":
      return "사용 가능";
    case "ON_LOAN":
      return "대여 중";
    case "RETURNED":
      return "반납 완료";
    case "WASHING":
      return "세척 중";
    case "LOST":
      return "분실";
    case "DAMAGED":
      return "파손";
    default:
      return "-";
  }
};
