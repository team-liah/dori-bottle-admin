import { usePaymentStatitics } from "@/client/payment";
import { Badge, BadgeProps, Calendar, CalendarProps, Divider } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

const CalendarSample = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number | undefined>(new Date().getMonth());
  const { data: statistics } = usePaymentStatitics({ year, month });

  const onChangePanel = (date: Dayjs, mode: "month" | "year") => {
    setYear(date.year());
    setMonth(mode === "month" ? date.month() : undefined);
  };

  const monthCellRender = (value: Dayjs) => {
    const data = statistics?.find((item) => dayjs(item.date).isSame(value, "month"));
    if (!data || data.totalAmount === 0) return null;
    return (
      <div className="flex flex-col text-[10px]">
        <div className="text-[14px] font-bold">{`₩ ${data?.totalAmount.toLocaleString() || 0}`}</div>
        <Divider
          style={{
            margin: "4px 0",
          }}
        />
        <CustomBadge status="success" text={data?.savePointAmount.toLocaleString() || "0"} />
        <CustomBadge status="warning" text={data?.lostCupAmount.toLocaleString() || "0"} />
        <CustomBadge
          status="error"
          text={
            statistics
              ?.find((item) => dayjs(item.date).isSame(value, "month"))
              ?.unblockAccountAmount.toLocaleString() || "0"
          }
        />
      </div>
    );
  };

  const dateCellRender = (value: Dayjs) => {
    return (
      <ul className="events">
        {statistics?.map((item) => {
          if (dayjs(item.date).isSame(value, "day") && item.totalAmount > 0) {
            return (
              <div key={`${item.date}`} className="flex flex-col text-[10px]">
                <div className="text-[14px] font-bold">{`₩ ${item.totalAmount.toLocaleString()}`}</div>
                <Divider
                  style={{
                    margin: "4px 0",
                  }}
                />
                <CustomBadge status="success" text={item.savePointAmount.toLocaleString()} />
                <CustomBadge status="warning" text={item.lostCupAmount.toLocaleString()} />
                <CustomBadge status="error" text={item.unblockAccountAmount.toLocaleString()} />
              </div>
            );
          }
        })}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} onPanelChange={onChangePanel} />;
};

export default React.memo(CalendarSample);

const CustomBadge = ({ status, text }: { status?: BadgeProps["status"]; text: string }) => {
  return (
    <Badge
      style={{
        lineHeight: "14px",
        fontSize: "11px",
      }}
      status={status}
      text={<span className="text-[11px]">{text}</span>}
    />
  );
};
