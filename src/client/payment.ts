import { getMonthName } from "@/utils/util";
import qs from "qs";
import useSWR from "swr";

export interface IPaymentStatitics {
  date: string;
  totalAmount: number;
  savePointAmount: number;
  lostCupAmount: number;
  unblockAccountAmount: number;
}

export interface IPaymentStatiticsParams {
  year: number;
  month?: number;
}

export const usePaymentStatitics = (params: IPaymentStatiticsParams) => {
  return useSWR<IPaymentStatitics[]>(
    `/api/payment/statistic?${qs.stringify({
      ...params,
      month: params.month ? getMonthName(params.month) : undefined,
    })}`
  );
};
