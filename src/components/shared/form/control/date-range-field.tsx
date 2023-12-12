import { DatePicker, Radio, RadioChangeEvent } from "antd";
import dayjs from "dayjs";
import React from "react";

interface IDateRangeFieldProps {
  value?: (string | null)[]; // 2023-12-10T02:50:11.508630Z"
  onChange?: (value: (string | null)[]) => void;
}

const dateRangeOptions = [
  { label: "오늘", value: "today" },
  { label: "1주일", value: "1week" },
  { label: "1개월", value: "1month" },
  { label: "3개월", value: "3months" },
  { label: "6개월", value: "6months" },
  { label: "1년", value: "1year" },
];

const DateRangeField = ({ value, onChange }: IDateRangeFieldProps) => {
  const handleDateRangeChange = (e: RadioChangeEvent) => {
    if (e.target.value === "today") {
      onChange?.([dayjs().format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
    } else if (e.target.value === "1week") {
      onChange?.([dayjs().subtract(1, "week").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
    } else if (e.target.value === "1month") {
      onChange?.([dayjs().subtract(1, "month").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
    } else if (e.target.value === "3months") {
      onChange?.([dayjs().subtract(3, "months").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
    } else if (e.target.value === "6months") {
      onChange?.([dayjs().subtract(6, "months").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
    } else if (e.target.value === "1year") {
      onChange?.([dayjs().subtract(1, "year").format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DatePicker
        placeholder="시작 날짜"
        onChange={(v: dayjs.Dayjs | null) => {
          onChange?.([v?.format("YYYY-MM-DD") || null, value?.[1] || null]);
        }}
        value={value?.[0] ? dayjs(value[0]) : null}
      />
      <span>~</span>
      <DatePicker
        placeholder="종료 날짜"
        onChange={(v: dayjs.Dayjs | null) => {
          onChange?.([value?.[0] || null, v?.format("YYYY-MM-DD") || null]);
        }}
        disabledDate={(current) => {
          return value?.[0] ? current < dayjs(value[0]).startOf("day") : false;
        }}
        value={value?.[1] ? dayjs(value[1]) : null}
      />
      <div className="flex items-center gap-1">
        <Radio.Group
          size="small"
          options={dateRangeOptions}
          optionType="button"
          buttonStyle="solid"
          onChange={handleDateRangeChange}
        />
      </div>
    </div>
  );
};

export default React.memo(DateRangeField);
