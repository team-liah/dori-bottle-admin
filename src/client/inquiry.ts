import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";
import { IUser } from "./user";

export type InquiryType = "REFUND" | "SALES" | "ETC";
export const INQUIRY_TYPES: InquiryType[] = ["REFUND", "SALES", "ETC"];

export type InquiryStatus = "PROCEEDING" | "SUCCEEDED";
export const INQUIRY_STATUSES: InquiryStatus[] = ["PROCEEDING", "SUCCEEDED"];

export type InquiryTargetType = "RENTAL" | "PAYMENT";
export const INQUIRY_TARGET_TYPES: InquiryTargetType[] = ["RENTAL", "PAYMENT"];

export interface IBankAccount {
  bank: string;
  accountNumber: string;
  accountHolder: string;
}

export interface IInquiry {
  id: React.Key;
  user: IUser;
  type: InquiryType;
  bankAccount?: IBankAccount;
  content: string;
  target?: {
    id: React.Key;
    classType: InquiryTargetType;
  };
  imageUrls: string[];
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

export interface IAnswerInquiryFormValue {
  answer: string;
}

export const useInquirys = (params: IInquirysParams = {}) => {
  return useSWR<IInquirysResponse>(`/api/inquiry?${qs.stringify(params)}`);
};

export const useInquiry = (id: React.Key) => {
  return useSWR<IInquiry>(`/api/inquiry/${id}`);
};

export const answerInquiry = (id: React.Key, value: IAnswerInquiryFormValue) => {
  return fetchApi.post(`/api/inquiry/${id}/succeed`, { body: JSON.stringify(value) });
};

export const getInquiryTypeLabel = (type?: InquiryType) => {
  switch (type) {
    case "REFUND":
      return "환불";
    case "SALES":
      return "도입 문의";
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
