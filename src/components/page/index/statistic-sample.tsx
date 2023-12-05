import { useStatistic } from "@/client/payment";
import { ArrowDown, ArrowUp } from "lucide-react";
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
  const data = useStatistic();

  if (!data) return <></>;
  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-5 border rounded-lg ">
          <div>총 매출</div>
          <div className="mt-3">
            <div className="flex items-center mt-3">
              <div className="text-2xl font-semibold grow">
                <CountUp end={data.totalAmount.value} separator="," />명
              </div>
              <div>{renderChangeRate(data.totalAmount.rate)}</div>
            </div>
          </div>
        </div>
        <div className="p-5 border rounded-lg ">
          <div>버블 충전</div>
          <div className="flex items-center mt-3">
            <div className="text-2xl font-semibold grow">
              <CountUp end={data.savePointAmount.value} separator="," />건
            </div>
            <div>{renderChangeRate(data.savePointAmount.rate)}</div>
          </div>
        </div>
        <div className="p-5 border rounded-lg ">
          <div>패널티 결제</div>
          <div className="flex items-center mt-3">
            <div className="text-2xl font-semibold grow">
              <CountUp end={data.penaltyAmount.value} separator="," />원
            </div>
            <div>{renderChangeRate(data.penaltyAmount.rate)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(StatisticSample);
