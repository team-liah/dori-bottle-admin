import { usePaymentStatitics, useRentalStatitics } from "@/client/statistic";
import { Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import CalendarDateCell from "./calendar-date-cell";
import CalendarMonthCell from "./calendar-month-cell";
import CustomBadge from "./custom-badge";

const CalendarSample = () => {
  const router = useRouter();
  const year = Number(router.query.year as string) || new Date().getFullYear();
  const month = Number(router.query.month as string) || new Date().getMonth() + 1;
  const mode = (router.query.mode as "month" | "year") || "month";

  const { data: paymentStatistics } = usePaymentStatitics({ year, month: mode === "month" ? month : undefined });
  const { data: rentalStatistics } = useRentalStatitics({ year, month: mode === "month" ? month : undefined });

  const onChangePanel = (date: Dayjs, mode: "month" | "year") => {
    router.push({
      query: {
        year: date.year(),
        month: date.month() + 1,
        mode: mode,
      },
    });
  };

  const monthCellRender = (value: Dayjs) => {
    const paymentData = paymentStatistics?.find((item) => dayjs(item.date).isSame(value, "month"));
    const rentalData = rentalStatistics?.find((item) => dayjs(item.date).isSame(value, "month"));
    return <CalendarMonthCell paymentData={paymentData} rentalData={rentalData} />;
  };

  const dateCellRender = (value: Dayjs) => {
    const paymentData = paymentStatistics?.find(
      (item) => dayjs(item.date).isSame(value, "day") && item.totalAmount > 0
    );
    const rentalData = rentalStatistics?.find((item) => dayjs(item.date).isSame(value, "day"));
    if (!paymentData && !rentalData) return null;

    return <CalendarDateCell paymentData={paymentData} rentalData={rentalData} />;
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <div className="flex flex-col text-[12px] gap-1 ml-auto bg-slate-100 w-fit p-4 rounded-md">
        <CustomBadge status="success" text="버블 결제 금액" />
        <CustomBadge status="warning" text="연체 결제 금액" />
        <CustomBadge status="error" text="패널티 결제 금액" />
        <CustomBadge status="default" text="사용 버블 개수" />
        <CustomBadge status="processing" text="대여 건수" />
      </div>
      <Calendar cellRender={cellRender} onPanelChange={onChangePanel} mode={mode}/>;
    </>
  );
};

export default React.memo(CalendarSample);
