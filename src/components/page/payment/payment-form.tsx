import {
  IPayment,
  cancelUserPayments,
  getBankProviderLabel,
  getCardOwnerTypeLabel,
  getCardTypeLabel,
  getPaymentStateLabel,
  getPaymentTypeLabel,
  getSaveTypeLabel,
} from "@/client/payment";
import { IPostFormValue } from "@/client/post";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { getErrorMessage } from "@/utils/error";
import { Button, Form, Popconfirm, Space, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { mutate } from "swr";

interface ICollectionFormProps {
  id?: string;
  initialValues?: Partial<IPayment>;
}

const CollectionForm = ({ id, initialValues }: ICollectionFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onClickPaymentCancel = async () => {
    const hide = messageApi.loading("결제 취소 중입니다.", 0);
    try {
      await cancelUserPayments([id as string]);
      messageApi.success("결제가 취소되었습니다.");
    } catch (e: unknown) {
      messageApi.error(await getErrorMessage(e));
    } finally {
      mutate(`/api/payment/${id}`);
    }
    hide();
  };

  return (
    <>
      {contextHolder}
      <DefaultForm<IPostFormValue> form={form} initialValues={initialValues}>
        <FormSection title="기본정보" description="결제 기본 정보입니다.">
          <FormGroup title="결제 ID">
            <Form.Item name="id">
              <DisabledInput />
            </Form.Item>
          </FormGroup>
          <FormGroup title="결제 금액">
            <Form.Item>
              <DisabledInput value={`${initialValues?.price?.toLocaleString()}원`} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="결제 타입">
            <Form.Item>
              <DisabledInput value={getPaymentTypeLabel(initialValues?.type)} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="결제 상태">
            <Form.Item name="status">
              <Space>
                <DisabledInput value={getPaymentStateLabel(initialValues?.status)} />
                <Popconfirm
                  title="결제를 취소하시겠습니까?"
                  onConfirm={onClickPaymentCancel}
                  okText="예"
                  disabled={initialValues?.status !== "SUCCEEDED"}
                  cancelText="아니오"
                >
                  <a className={`px-2 py-1 text-sm btn ${initialValues?.status !== "SUCCEEDED" && "hidden"}`}>
                    결제 취소
                  </a>
                </Popconfirm>
              </Space>
            </Form.Item>
          </FormGroup>
          <FormGroup title="생성 날짜">
            <Form.Item>
              <DisabledInput value={dayjs(initialValues?.createdDate).format("YYYY/MM/DD HH:mm")} />
            </Form.Item>
          </FormGroup>

          <FormGroup title="수정 날짜">
            <Form.Item>
              <DisabledInput value={dayjs(initialValues?.lastModifiedDate).format("YYYY/MM/DD HH:mm")} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="영수증">
            <Form.Item>
              {initialValues?.result?.receiptUrl && (
                <Space className="px-[11px]">
                  <ExternalLink className="w-4 h-4 text-[#056BF1]" />
                  <a href={initialValues.result.receiptUrl} target="_blank" rel="noreferrer">
                    영수증 보기
                  </a>
                </Space>
              )}
            </Form.Item>
          </FormGroup>
        </FormSection>

        <FormSection title="카드 정보" description="결제 카드 정보입니다.">
          <FormGroup title="카드 종류">
            <Form.Item>
              <DisabledInput value={`${getCardTypeLabel(initialValues?.card?.cardType)}`} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="카드 발급사">
            <Form.Item>
              <DisabledInput
                value={`${getBankProviderLabel(initialValues?.card?.acquirerProvider)} (${getCardOwnerTypeLabel(
                  initialValues?.card?.cardOwnerType
                )})`}
              />
            </Form.Item>
          </FormGroup>
          <FormGroup title="카드 번호">
            <Form.Item name={["card", "number"]}>
              <DisabledInput />
            </Form.Item>
          </FormGroup>
        </FormSection>

        {initialValues?.point && (
          <FormSection title="충전 정보" description="결제 포인트 정보입니다.">
            <FormGroup title="버블 종류">
              <Form.Item>
                <DisabledInput value={getSaveTypeLabel(initialValues.point.saveType)} />
              </Form.Item>
            </FormGroup>
            <FormGroup title="잔여 버블">
              <Form.Item>
                <DisabledInput
                  value={`${initialValues?.point?.remainAmounts.toLocaleString()}개 / ${initialValues.point.saveAmounts.toLocaleString()}개`}
                />
              </Form.Item>
            </FormGroup>
          </FormSection>
        )}

        <FormSection title="유저 정보" description="결제 유저 정보입니다.">
          <FormGroup title="유저 ID">
            <Form.Item name={["user", "id"]}>
              <DisabledInput />
            </Form.Item>
          </FormGroup>
          <FormGroup title="유저 이름">
            <Form.Item name={["user", "name"]}>
              <DisabledInput />
            </Form.Item>
          </FormGroup>
          <FormGroup title="전화번호">
            <Form.Item name={["user", "loginId"]}>
              <DisabledInput />
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

export default React.memo(CollectionForm);

const DisabledInput = ({ value }: { value?: any }) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        margin: 0,
        padding: "4px 11px",
        color: "rgba(0, 0, 0, 0.88)",
        fontSize: 14,
        lineHeight: 1.5714285714285714,
        listStyle: "none",
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
        position: "relative",
        display: "inline-block",
        width: "100%",
        minWidth: 0,
        backgroundColor: "#ffffff",
        backgroundImage: "none",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 6,
        transition: "all 0.2s",
        borderColor: "transparent",
        cursor: "default",
      }}
    >
      {value}
    </div>
  );
};
