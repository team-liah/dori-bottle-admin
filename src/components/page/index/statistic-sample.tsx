import { usePaymentMonthStatistic, useRentalMonthStatistic } from "@/client/statistic";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import CountUp from "react-countup";

const renderChangeRate = (value: number) => {
  if (value > 0) {
    return (
      <span className="flex items-center px-2 py-1 text-sm text-white rounded-full bg-emerald">
        <ArrowUp className="w-5 h-4" />
        {value}%
      </span>
    );
  } else if (value < 0) {
    return (
      <span className="flex items-center px-2 py-1 text-sm text-white rounded-full bg-alizarin">
        <ArrowDown className="w-5 h-4" />
        {value}%
      </span>
    );
  }
};

const StatisticSample = () => {
  const router = useRouter();
  const currentYear = Number(router.query.year as string) || new Date().getFullYear();
  const currentMonth = Number(router.query.month as string) || new Date().getMonth() + 1;
  const mode = (router.query.mode as "month" | "year") || "month";

  const paymentData = usePaymentMonthStatistic({
    year: currentYear,
    month: mode === "month" ? currentMonth : undefined,
    mode,
  });
  const rentalData = useRentalMonthStatistic({
    year: currentYear,
    month: mode === "month" ? currentMonth : undefined,
    mode,
  });

  if (!paymentData || !rentalData) return <></>;
  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-5 border rounded-lg ">
          <div>{mode === "month" ? `${currentMonth}월` : `${currentYear}년`} 총 매출</div>
          <div className="mt-3">
            <div className="flex items-center mt-3">
              <div className="text-2xl font-semibold grow">
                <CountUp end={paymentData.totalAmount.value} separator="," />원
              </div>
              <div>{renderChangeRate(paymentData.totalAmount.rate)}</div>
            </div>
          </div>
        </div>
        <div className="p-5 border rounded-lg ">
          <div>사용 버블 개수</div>
          <div className="flex items-center mt-3">
            <div className="text-2xl font-semibold grow">
              <CountUp end={rentalData.totalPointAmount.value} separator="," />개
            </div>
            <div>{renderChangeRate(rentalData.totalPointAmount.rate)}</div>
          </div>
        </div>
        <div className="p-5 border rounded-lg ">
          <div>페널티 결제</div>
          <div className="flex items-center mt-3">
            <div className="text-2xl font-semibold grow">
              <CountUp end={paymentData.penaltyAmount.value} separator="," />원
            </div>
            <div>{renderChangeRate(paymentData.penaltyAmount.rate)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(StatisticSample);
