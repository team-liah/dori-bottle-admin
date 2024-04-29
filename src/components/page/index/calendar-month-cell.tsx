import { IPaymentStatitics, IRentalStatitics } from "@/client/statistic";
import { Divider } from "antd";
import CustomBadge from "./custom-badge";

interface ICalendarMonthCellProps {
  paymentData?: IPaymentStatitics;
  rentalData?: IRentalStatitics;
}

//#region Styled Component

//#endregion

const CalendarMonthCell = ({ paymentData, rentalData }: ICalendarMonthCellProps) => {
  const totalCount =
    (rentalData?.confirmedCount || 0) + (rentalData?.succeededCount || 0) + (rentalData?.failedCount || 0);

  return (
    <>
      <div className="flex flex-col text-[10px]">
        <div className="text-[14px] font-bold">{`₩ ${paymentData?.totalAmount.toLocaleString() || 0}`}</div>
        <Divider
          style={{
            margin: "4px 0",
          }}
        />
        <CustomBadge status="success" text={paymentData?.savePointAmount.toLocaleString() || "0"} />
        <CustomBadge status="warning" text={rentalData?.totalPointAmount.toLocaleString() || "0"} />
        <CustomBadge status="error" text={paymentData?.unblockAccountAmount.toLocaleString() || "0"} />
        <CustomBadge status="default" text={rentalData?.totalPointAmount.toLocaleString() || "0"} />
        <CustomBadge status="processing" text={totalCount.toLocaleString() || "0"} />
      </div>
    </>
  );
};

export default CalendarMonthCell;
