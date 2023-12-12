import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "./base";
import { IPageable } from "./pageable";
import { IUser } from "./user";

export type PaymentType = "SAVE_POINT" | "LOST_CUP" | "UNBLOCK_ACCOUNT";
export const PAYMENT_TYPES: PaymentType[] = ["SAVE_POINT", "LOST_CUP", "UNBLOCK_ACCOUNT"];

export type PaymentStatus = "PROCEEDING" | "SUCCEEDED" | "FAILED" | "CANCELED";
export const PAYMENT_STATUSES: PaymentStatus[] = ["PROCEEDING", "SUCCEEDED", "FAILED", "CANCELED"];

export type CardType = "CREDIT" | "CHECK" | "GIFT";
export const CARD_TYPES: CardType[] = ["CREDIT", "CHECK", "GIFT"];

export type CardOwnerType = "PERSONAL" | "CORPORATE";
export const CARD_OWNER_TYPES: CardOwnerType[] = ["PERSONAL", "CORPORATE"];

export type BankProvider =
  | "IBK_BC"
  | "GWANGJUBANK"
  | "LOTTE"
  | "KDBBANK"
  | "BC"
  | "SAMSUNG"
  | "SAEMAUL"
  | "SHINHAN"
  | "SHINHYEOP"
  | "CITI"
  | "WOORI_BC"
  | "WOORI"
  | "POST"
  | "SAVINGBANK"
  | "JEONBUKBANK"
  | "JEJUBANK"
  | "KAKAOBANK"
  | "KBANK"
  | "TOSSBANK"
  | "HANA"
  | "HYUNDAI"
  | "KOOKMIN"
  | "NONGHYEOP"
  | "SUHYEOP";

export const BANK_PROVIDERS: BankProvider[] = [
  "IBK_BC",
  "GWANGJUBANK",
  "LOTTE",
  "KDBBANK",
  "BC",
  "SAMSUNG",
  "SAEMAUL",
  "SHINHAN",
  "SHINHYEOP",
  "CITI",
  "WOORI_BC",
  "WOORI",
  "POST",
  "SAVINGBANK",
  "JEONBUKBANK",
  "JEJUBANK",
  "KAKAOBANK",
  "KBANK",
  "TOSSBANK",
  "HANA",
  "HYUNDAI",
  "KOOKMIN",
  "NONGHYEOP",
  "SUHYEOP",
];

export type SaveType = "PAY" | "REWARD";
export const SAVE_TYPES: SaveType[] = ["PAY", "REWARD"];

export interface ICard {
  issuerProvider: BankProvider;
  acquirerProvider: BankProvider;
  number: string;
  cardType: CardType;
  cardOwnerType: CardOwnerType;
}

export interface IPaymentResult {
  paymentKey: string;
  approvedDate: string;
  receiptUrl: string;
  cancelKey: string;
}

export interface IPaymentPoint {
  id: React.Key;
  userId: React.Key;
  saveType: SaveType;
  description: string;
  saveAmounts: number;
  remainAmounts: number;
  createdDate: string;
  lastModifiedDate: string;
}

export interface IPayment {
  id: React.Key;
  user: IUser;
  price: number;
  type: PaymentType;
  card: ICard;
  status: PaymentStatus;
  result: IPaymentResult;
  point: IPaymentPoint;
  createdDate: string;
  lastModifiedDate: string;
}

export interface IPaymentsParams {
  userId?: React.Key;
  type?: PaymentType;
  status?: PaymentStatus;
  fromApprovedDate?: string;
  toApprovedDate?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface IPaymentsResponse {
  content: IPayment[];
  pageable: IPageable;
}

export const usePayments = (params: IPaymentsParams = {}) => {
  return useSWR<IPaymentsResponse>(`/api/payment?${qs.stringify(params)}`);
};

export const usePayment = (id: React.Key) => {
  return useSWR<IPayment>(`/api/payment/${id}`);
};

export const cancelUserPayments = async (ids: React.Key[]) => {
  for (const id of ids) {
    await fetchApi.post(`/api/payment/${id}/cancel`);
  }

  return Promise.resolve();
};

export const getPaymentStateLabel = (state?: PaymentStatus) => {
  switch (state) {
    case "PROCEEDING":
      return "진행 중";
    case "SUCCEEDED":
      return "✅ 결제 완료";
    case "FAILED":
      return "⛔️ 결제 실패";
    case "CANCELED":
      return "↩️ 결제 취소";
    default:
      return "알 수 없음";
  }
};

export const getPaymentTypeLabel = (type?: PaymentType) => {
  switch (type) {
    case "SAVE_POINT":
      return "버블 충전";
    case "LOST_CUP":
      return "컵 분실";
    case "UNBLOCK_ACCOUNT":
      return "블락 해제";
    default:
      return "알 수 없음";
  }
};

export const getCardTypeLabel = (type?: CardType) => {
  switch (type) {
    case "CREDIT":
      return "신용카드";
    case "CHECK":
      return "체크카드";
    case "GIFT":
      return "기프트카드";
    default:
      return "알 수 없음";
  }
};

export const getCardOwnerTypeLabel = (type?: CardOwnerType) => {
  switch (type) {
    case "PERSONAL":
      return "개인";
    case "CORPORATE":
      return "법인";
    default:
      return "알 수 없음";
  }
};

export const getBankProviderLabel = (provider?: BankProvider) => {
  switch (provider) {
    case "IBK_BC":
      return "기업은행(BC)";
    case "GWANGJUBANK":
      return "광주은행";
    case "LOTTE":
      return "롯데카드";
    case "KDBBANK":
      return "산업은행";
    case "BC":
      return "BC카드";
    case "SAMSUNG":
      return "삼성카드";
    case "SAEMAUL":
      return "새마을금고";
    case "SHINHAN":
      return "신한카드";
    case "SHINHYEOP":
      return "신협";
    case "CITI":
      return "한미카드";
    case "WOORI_BC":
      return "우리은행(BC)";
    case "WOORI":
      return "우리카드";
    case "POST":
      return "우체국";
    case "SAVINGBANK":
      return "저축은행";
    case "JEONBUKBANK":
      return "전북은행";
    case "JEJUBANK":
      return "제주은행";
    case "KAKAOBANK":
      return "카카오뱅크";
    case "KBANK":
      return "케이뱅크";
    case "TOSSBANK":
      return "토스뱅크";
    case "HANA":
      return "하나은행";
    case "HYUNDAI":
      return "현대카드";
    case "KOOKMIN":
      return "국민은행";
    case "NONGHYEOP":
      return "농협";
    case "SUHYEOP":
      return "수협";
    default:
      return "알 수 없음";
  }
};

export const getSaveTypeLabel = (type?: SaveType) => {
  switch (type) {
    case "PAY":
      return "충전";
    case "REWARD":
      return "리워드";
    default:
      return "알 수 없음";
  }
};
