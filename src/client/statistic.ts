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

export interface IRentalStatitics {
  date: string;
  totalPointAmount: number; // 총 버블 사용량 (취소만 제외)
  confirmedCount: number; // 대여 중 대여 횟수
  succeededCount: number; // 정상 반납된 대여 횟수
  failedCount: number; // 연체 대여 횟수
  canceledCount: number; // 취소 대여 횟수
}

export interface IStatiticsParams {
  year: number;
  month?: number;
  mode?: "month" | "year";
}

export const usePaymentStatitics = (params: IStatiticsParams) => {
  return useSWR<IPaymentStatitics[]>(
    `/api/payment/statistic?${qs.stringify({
      ...params,
      month: params.month ? getMonthName(params.month) : undefined,
    })}`
  );
};

export const usePaymentMonthStatistic = (params: IStatiticsParams) => {
  const { data } = useSWR<IPaymentStatitics[]>(
    `/api/payment/statistic?${qs.stringify({
      year: params.year,
    })}`
  );

  if (params.mode === "year") {
    return {
      totalAmount: {
        value: data?.reduce((acc, curr) => acc + curr.totalAmount, 0) || 0,
        rate: 0,
      },
      savePointAmount: {
        value: data?.reduce((acc, curr) => acc + curr.savePointAmount, 0) || 0,
        rate: 0,
      },
      penaltyAmount: {
        value: data?.reduce((acc, curr) => acc + curr.lostCupAmount + curr.unblockAccountAmount, 0) || 0,
        rate: 0,
      },
    };
  }

  const currentStatistic = data?.find((item) => dayjs(item.date).month() + 1 === params.month);
  const prevStatistic = data?.find((item) => dayjs(item.date).month() + 2 === params.month);

  if (!currentStatistic)
    return {
      totalAmount: {
        value: 0,
        rate: 0,
      },
      savePointAmount: {
        value: 0,
        rate: 0,
      },
      penaltyAmount: {
        value: 0,
        rate: 0,
      },
    };
  return {
    totalAmount: {
      value: currentStatistic.totalAmount,
      rate: getRate(currentStatistic.totalAmount, prevStatistic?.totalAmount),
    },
    savePointAmount: {
      value: currentStatistic.savePointAmount,
      rate: getRate(currentStatistic.savePointAmount, prevStatistic?.savePointAmount),
    },
    penaltyAmount: {
      value: currentStatistic.lostCupAmount + currentStatistic.unblockAccountAmount,
      rate: getRate(
        currentStatistic.lostCupAmount + currentStatistic.unblockAccountAmount,
        (prevStatistic?.lostCupAmount || 0) + (prevStatistic?.unblockAccountAmount || 0)
      ),
    },
  };
};

export const useRentalStatitics = (params: IStatiticsParams) => {
  return useSWR<IRentalStatitics[]>(
    `/api/rental/statistic?${qs.stringify({
      ...params,
      month: params.month ? getMonthName(params.month) : undefined,
    })}`
  );
};

export const useRentalMonthStatistic = (params: IStatiticsParams) => {
  const { data } = useSWR<IRentalStatitics[]>(
    `/api/rental/statistic?${qs.stringify({
      year: params.year,
    })}`
  );

  if(params.mode === "year") {
    return {
      totalPointAmount: {
        value: data?.reduce((acc, curr) => acc + curr.totalPointAmount, 0) || 0,
        rate: 0,
      },
      confirmedCount: {
        value: data?.reduce((acc, curr) => acc + curr.confirmedCount, 0) || 0,
        rate: 0,
      },
      succeededCount: {
        value: data?.reduce((acc, curr) => acc + curr.succeededCount, 0) || 0,
        rate: 0,
      },
      failedCount: {
        value: data?.reduce((acc, curr) => acc + curr.failedCount, 0) || 0,
        rate: 0,
      },
      canceledCount: {
        value: data?.reduce((acc, curr) => acc + curr.canceledCount, 0) || 0,
        rate: 0,
      },
    };
  }

  const currentStatistic = data?.find((item) => dayjs(item.date).month() + 1 === params.month);
  const prevStatistic = data?.find((item) => dayjs(item.date).month() + 2 === params.month);

  if (!currentStatistic)
    return {
      totalPointAmount: {
        value: 0,
        rate: 0,
      },
      confirmedCount: {
        value: 0,
        rate: 0,
      },
      succeededCount: {
        value: 0,
        rate: 0,
      },
      failedCount: {
        value: 0,
        rate: 0,
      },
      canceledCount: {
        value: 0,
        rate: 0,
      },
    };

  return {
    totalPointAmount: {
      value: currentStatistic.totalPointAmount,
      rate: getRate(currentStatistic.totalPointAmount, prevStatistic?.totalPointAmount),
    },
    confirmedCount: {
      value: currentStatistic.confirmedCount,
      rate: getRate(currentStatistic.confirmedCount, prevStatistic?.confirmedCount),
    },
    succeededCount: {
      value: currentStatistic.succeededCount,
      rate: getRate(currentStatistic.succeededCount, prevStatistic?.succeededCount),
    },
    failedCount: {
      value: currentStatistic.failedCount,
      rate: getRate(currentStatistic.failedCount, prevStatistic?.failedCount),
    },
    canceledCount: {
      value: currentStatistic.canceledCount,
      rate: getRate(currentStatistic.canceledCount, prevStatistic?.canceledCount),
    },
  };
};

const getRate = (current: number, prev?: number) => {
  if (!prev) return 0;
  return prev > 0 ? Number((((current - prev) / prev) * 100).toFixed(2)) : 0;
};