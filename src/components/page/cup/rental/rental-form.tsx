import { getCupStateLabel } from "@/client/cup";
import { IPostFormValue } from "@/client/post";
import { IRental, cancelUserRentals, getRentalStateLabel, returnUserRentals } from "@/client/rental";
import DefaultForm from "@/components/shared/form/ui/default-form";
import DefaultText from "@/components/shared/form/ui/default-text";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { getErrorMessage } from "@/utils/error";
import { Button, Form, Input, Popconfirm, Space, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { mutate } from "swr";

interface IRentalFormProps {
  id?: string;
  initialValues?: Partial<IRental>;
}

const RentalForm = ({ id, initialValues }: IRentalFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onClickRentalReturn = async () => {
    try {
      if (!initialValues?.cup?.rfid) throw new Error("컵 ID가 없습니다.");
      if (!form.getFieldValue("toMachineNo")) throw new Error("반납함 No.가 없습니다.");

      await returnUserRentals({
        cupRfid: initialValues?.cup?.rfid as string,
        machineNo: form.getFieldValue("toMachineNo") as string,
      });
      messageApi.success("반납 처리되었습니다.");
      mutate(`/api/rental/${id}`);
    } catch (e: unknown) {
      messageApi.error(await getErrorMessage(e));
    }
  };

  const onClickRentalCancel = async () => {
    try {
      await cancelUserRentals([id as string]);
      messageApi.success("대여가 취소되었습니다.");
      mutate(`/api/rental/${id}`);
    } catch (e: unknown) {
      messageApi.error(await getErrorMessage(e));
    } finally {
    }
  };

  const isReturned = initialValues?.toMachine !== null;

  const isProceeding = ["PROCEEDING", "FAILED"].includes(initialValues?.status as string);

  return (
    <>
      {contextHolder}
      <DefaultForm<IPostFormValue> form={form} initialValues={initialValues}>
        <FormSection title="기본정보" description="대여 기본 정보입니다.">
          <FormGroup title="No.">
            <Form.Item name="no">
              <DefaultText />
            </Form.Item>
          </FormGroup>
          <FormGroup title="컵 종류">
            <Form.Item>
              <DefaultText value={initialValues?.withIce ? "얼음 컵" : "일반 컵"} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="사용 버블">
            <Form.Item>
              <DefaultText value={`${initialValues?.cost?.toLocaleString()}개`} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="대여 상태">
            <Form.Item name="status">
              <Space>
                <DefaultText
                  value={`${isReturned ? "반납됨" : "미반납"} (${getRentalStateLabel(initialValues?.status)})`}
                />
                <Popconfirm
                  title="대여를 취소하시겠습니까?"
                  onConfirm={onClickRentalCancel}
                  disabled={!isProceeding || isReturned}
                  okText="예"
                  cancelText="아니오"
                >
                  <a className={`px-2 py-1 text-sm btn ${(!isProceeding || isReturned) && "hidden"}`}>대여 취소</a>
                </Popconfirm>
                <Popconfirm
                  title={
                    <div className="flex flex-col gap-2">
                      반납 처리하시겠습니까?
                      <Form.Item name="toMachineNo">
                        <Input placeholder="반납함 No" />
                      </Form.Item>
                    </div>
                  }
                  disabled={isReturned}
                  onConfirm={onClickRentalReturn}
                  okText="예"
                  cancelText="아니오"
                >
                  <a className={`px-2 py-1 text-sm btn ${isReturned && "hidden"}`}>반납 처리</a>
                </Popconfirm>
              </Space>
            </Form.Item>
          </FormGroup>
          <FormGroup title="대여 일시">
            <Form.Item>
              <DefaultText value={dayjs(initialValues?.createdDate).format("YYYY/MM/DD HH:mm")} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="대여 만료 일시">
            <Form.Item>
              <DefaultText value={dayjs(initialValues?.expiredDate).format("YYYY/MM/DD HH:mm")} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="반납 일시">
            <Form.Item>
              <DefaultText
                value={
                  initialValues?.succeededDate ? dayjs(initialValues?.succeededDate).format("YYYY/MM/DD HH:mm") : "-"
                }
              />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <FormSection title="대여/반납 위치 정보" description="대여 및 반납된 기기의 정보입니다.">
          <FormGroup title="자판기 이름">
            <Form.Item>
              <Link href={`/machine/vending/edit/${initialValues?.fromMachine?.id}`}>
                <DefaultText value={initialValues?.fromMachine?.name} />
              </Link>
            </Form.Item>
          </FormGroup>
          <FormGroup title="자판기 위치">
            <Form.Item>
              <DefaultText
                value={`${initialValues?.fromMachine?.address.address1} ${initialValues?.fromMachine?.address.address2}`}
              />
            </Form.Item>
          </FormGroup>
          <FormGroup title="반납함 이름">
            <Form.Item>
              {initialValues?.toMachine ? (
                <Link href={`/machine/collection/edit/${initialValues?.toMachine?.id}`}>
                  <DefaultText value={initialValues?.toMachine?.name} />
                </Link>
              ) : (
                <DefaultText value="-" />
              )}
            </Form.Item>
          </FormGroup>
          <FormGroup title="반납함 위치">
            <Form.Item>
              <DefaultText
                value={`${initialValues?.toMachine?.address.address1 || "-"} ${
                  initialValues?.toMachine?.address.address2 || ""
                }`}
              />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <FormSection title="컵 정보" description="대여 컵 정보입니다.">
          <FormGroup title="컵 RFID">
            <Form.Item name={["cup", "rfid"]}>
              <DefaultText />
            </Form.Item>
          </FormGroup>
          <FormGroup title="컵 이름">
            <Form.Item>
              <DefaultText value={getCupStateLabel(initialValues?.cup?.status)} />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <FormSection title="유저 정보" description="대여 유저 정보입니다.">
          <FormGroup title="유저 ID">
            <Form.Item name={["user", "id"]}>
              <DefaultText />
            </Form.Item>
          </FormGroup>
          <FormGroup title="유저 이름">
            <Form.Item name={["user", "name"]}>
              <DefaultText />
            </Form.Item>
          </FormGroup>
          <FormGroup title="전화번호">
            <Form.Item name={["user", "loginId"]}>
              <DefaultText />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <div className="text-center">
          <Button htmlType="button" type="default" onClick={() => router.back()}>
            뒤로
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(RentalForm);
