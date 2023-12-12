import { getMonthName } from "@/utils/util";
import dayjs from "dayjs";
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

// TODO: 임시 통계
export const useStatistic = () => {
  const { data } = useSWR<IPaymentStatitics[]>(
    `/api/payment/statistic?${qs.stringify({
      year: new Date().getFullYear(),
    })}`
  );

  const currentStatistic = data?.find((item) => dayjs(item.date).month() === dayjs().month());
  const prevStatistic = data?.find((item) => dayjs(item.date).month() === dayjs().month() - 1);

  if (!currentStatistic || !prevStatistic) return null;

  return {
    totalAmount: {
      value: currentStatistic.totalAmount,
      rate:
        prevStatistic.savePointAmount > 0
          ? Number(
              (((currentStatistic.totalAmount - prevStatistic.totalAmount) / prevStatistic.totalAmount) * 100).toFixed(
                2
              )
            )
          : 0,
    },
    savePointAmount: {
      value: currentStatistic.savePointAmount,
      rate:
        prevStatistic.savePointAmount > 0
          ? Number(
              (
                ((currentStatistic.savePointAmount - prevStatistic.savePointAmount) / prevStatistic.savePointAmount) *
                100
              ).toFixed(2)
            )
          : 0,
    },
    penaltyAmount: {
      value: currentStatistic.lostCupAmount + currentStatistic.unblockAccountAmount,
      rate:
        prevStatistic.lostCupAmount + prevStatistic.unblockAccountAmount > 0
          ? Number(
              (
                ((currentStatistic.lostCupAmount +
                  currentStatistic.unblockAccountAmount -
                  prevStatistic.lostCupAmount -
                  prevStatistic.unblockAccountAmount) /
                  (prevStatistic.lostCupAmount + prevStatistic.unblockAccountAmount)) *
                100
              ).toFixed(2)
            )
          : 0,
    },
  };
};
