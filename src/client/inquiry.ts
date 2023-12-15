import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";
import { IUser } from "./user";

export type InquiryType = "REFUND" | "ETC";
export const INQUIRY_TYPES: InquiryType[] = ["REFUND", "ETC"];

export type InquiryStatus = "PROCEEDING" | "SUCCEEDED";
export const INQUIRY_STATUSES: InquiryStatus[] = ["PROCEEDING", "SUCCEEDED"];

export interface IBankAccount {
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

export interface IInquiry {
  id: React.Key;
  user: IUser;
  type: InquiryType;
  bankAccount: IBankAccount;
  content: string;
  answer: string;
  status: InquiryStatus;
  createdDate: string;
  lastModifiedDate: string;
}

export interface IInquirysParams {
  userId?: React.Key;
  type?: InquiryType;
  status?: InquiryStatus;
  keyword?: string;
  page?: number;
  size?: number;
  sort?: string | string[];
}

export interface IInquirysResponse {
  content: IInquiry[];
  pageable: IPageable;
}

export interface IReturnInquiryFormValue {
  machineNo: React.Key;
  cupRfid: string;
}

export const useInquirys = (params: IInquirysParams = {}) => {
  return useSWR<IInquirysResponse>(`/api/inquiry?${qs.stringify(params)}`);
};

export const useInquiry = (id: React.Key) => {
  return useSWR<IInquiry>(`/api/inquiry/${id}`);
};

export const answerInquiry = (id: React.Key, answer: string) => {
  return fetchApi.post(`/api/inquiry/${id}/succeed`, { body: JSON.stringify(answer) });
};

export const getInquiryTypeLabel = (type?: InquiryType) => {
  switch (type) {
    case "REFUND":
      return "환불";
    case "ETC":
      return "기타";
    default:
      return "알 수 없음";
  }
};

export const getInquiryStatusLabel = (status?: InquiryStatus) => {
  switch (status) {
    case "PROCEEDING":
      return "처리 중";
    case "SUCCEEDED":
      return "답변 완료";
    default:
      return "알 수 없음";
  }
};
