import { IPaymentStatitics, IRentalStatitics } from "@/client/statistic";
import { Col, Divider, Modal, Row, Statistic } from "antd";
import { useState } from "react";
import CustomBadge from "./custom-badge";

interface ICalendarDateCellProps {
  paymentData?: IPaymentStatitics;
  rentalData?: IRentalStatitics;
}

//#region Styled Component

//#endregion

const CalendarDateCell = ({ paymentData, rentalData }: ICalendarDateCellProps) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen(!open);
  };

  const date = paymentData?.date || rentalData?.date;
  const totalCount =
    (rentalData?.confirmedCount || 0) + (rentalData?.succeededCount || 0) + (rentalData?.failedCount || 0);

  return (
    <>
      <ul className="events" onClick={toggleModal}>
        <div key={`${date}`} className="flex flex-col text-[10px]">
          <div className="text-[16px] font-bold underline cursor-pointer">{`₩ ${
            paymentData?.totalAmount.toLocaleString() || "0"
          }`}</div>
          <Divider
            style={{
              margin: "4px 0",
            }}
          />
          <CustomBadge status="success" text={paymentData?.savePointAmount.toLocaleString() || "0"} />
          <CustomBadge status="warning" text={paymentData?.lostCupAmount.toLocaleString() || "0"} />
          <CustomBadge status="error" text={paymentData?.unblockAccountAmount.toLocaleString() || "0"} />
          <CustomBadge status="default" text={rentalData?.totalPointAmount.toLocaleString() || "0"} />
          <CustomBadge status="processing" text={totalCount.toLocaleString() || "0"} />
        </div>
      </ul>
      <Modal title={date} open={open} footer={null} onCancel={toggleModal}>
        <div className="flex flex-col gap-4">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="총 매출" value={paymentData?.totalAmount.toLocaleString() || "0"} prefix={"₩"} />
            </Col>
          </Row>
          <div className="grid justify-between w-full grid-cols-3 gap-4">
            <Statistic
              title="버블 결제 금액"
              value={paymentData?.savePointAmount.toLocaleString() || "0"}
              prefix={"₩"}
            />
            <Statistic title="연체 결제 금액" value={paymentData?.lostCupAmount.toLocaleString() || "0"} prefix={"₩"} />
            <Statistic
              title="패널티 결제 금액"
              value={paymentData?.unblockAccountAmount.toLocaleString() || "0"}
              prefix={"₩"}
            />
            <Statistic title="사용 버블 개수" value={rentalData?.totalPointAmount.toLocaleString() || "0"} />
            <Statistic title="대여 건수" value={totalCount.toLocaleString() || "0"} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CalendarDateCell;
