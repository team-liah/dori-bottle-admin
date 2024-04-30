import { IInquiry, answerInquiry, getInquiryStatusLabel, getInquiryTypeLabel } from "@/client/inquiry";
import { getPaymentStateLabel, getPaymentTypeLabel, usePayment } from "@/client/payment";
import { IPostFormValue } from "@/client/post";
import { useRental } from "@/client/rental";
import DefaultForm from "@/components/shared/form/ui/default-form";
import DefaultText from "@/components/shared/form/ui/default-text";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { getErrorMessage } from "@/utils/error";
import { Button, Form, Image, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface IInquiryFormProps {
  id?: string;
  initialValues?: Partial<IInquiry>;
}

const InquiryForm = ({ id, initialValues }: IInquiryFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: rental } = useRental(
    initialValues?.target?.classType === "RENTAL" ? initialValues?.target?.id : undefined
  );
  const { data: payment } = usePayment(
    initialValues?.target?.classType === "PAYMENT" ? initialValues?.target?.id : undefined
  );

  const handleFinish = async (formValue: IInquiry) => {
    try {
      setIsLoading(true);
      if (formValue.answer === undefined) throw new Error("답변을 입력해주세요");

      await answerInquiry(id!, formValue);

      messageApi.success("수정되었습니다");

      setTimeout(() => router.push("/user/inquiry/list"), 500);
    } catch (e: unknown) {
      messageApi.error(await getErrorMessage(e));
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <>
      {contextHolder}
      <DefaultForm<IPostFormValue> form={form} initialValues={initialValues} onFinish={handleFinish}>
        <FormSection title="기본정보" description="문의 기본 정보입니다.">
          <FormGroup title="문의 종류">
            <Form.Item>
              <DefaultText value={getInquiryTypeLabel(initialValues?.type)} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="처리 상태">
            <Form.Item>
              <DefaultText value={getInquiryStatusLabel(initialValues?.status)} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="내용">
            <Form.Item name="content">
              <DefaultText />
            </Form.Item>
            {initialValues?.imageUrls && initialValues?.imageUrls.length > 0 && (
              <Form.Item>
                <div className="flex flex-row gap-4">
                  {initialValues?.imageUrls?.map((image) => <Image key={image} alt="" src={image} />)}
                </div>
              </Form.Item>
            )}
          </FormGroup>
          <FormGroup title="답변">
            <Form.Item name="answer">
              <Input.TextArea />
            </Form.Item>
          </FormGroup>
          <FormGroup title="생성 일시">
            <Form.Item>
              <DefaultText value={dayjs(initialValues?.createdDate).format("YYYY/MM/DD HH:mm")} />
            </Form.Item>
          </FormGroup>
          <FormGroup title="수정 일시">
            <Form.Item>
              <DefaultText value={dayjs(initialValues?.lastModifiedDate).format("YYYY/MM/DD HH:mm")} />
            </Form.Item>
          </FormGroup>
        </FormSection>

        {initialValues?.bankAccount && (
          <FormSection title="환불 정보" description="환불 요청한 계좌 정보입니다.">
            <FormGroup title="예금주">
              <Form.Item name={["bankAccount", "accountHolder"]}>
                <DefaultText />
              </Form.Item>
            </FormGroup>
            <FormGroup title="은행">
              <Form.Item name={["bankAccount", "bank"]}>
                <DefaultText />
              </Form.Item>
            </FormGroup>
            <FormGroup title="계좌번호">
              <Form.Item name={["bankAccount", "accountNumber"]}>
                <DefaultText />
              </Form.Item>
            </FormGroup>
          </FormSection>
        )}

        {rental && (
          <FormSection title="대여 정보" description="대여 정보입니다.">
            <FormGroup title="대여 번호">
              <Form.Item>
                <DefaultText
                  value={
                    <Link href={`/cup/rental/edit/${rental.id}`} className="text-black underline">
                      {rental.no}
                    </Link>
                  }
                />
              </Form.Item>
            </FormGroup>
            <FormGroup title="대여 기기">
              <Form.Item>
                <DefaultText value={rental.fromMachine?.name || "-"} />
              </Form.Item>
            </FormGroup>
            <FormGroup title="반납 기기">
              <Form.Item>
                <DefaultText value={rental.toMachine?.name || "-"} />
              </Form.Item>
            </FormGroup>
            <FormGroup title="대여 컵">
              <Form.Item>
                <DefaultText value={rental.cup?.rfid || "-"} />
              </Form.Item>
            </FormGroup>
            <FormGroup title="대여 비용">
              <Form.Item>
                <DefaultText value={rental.cost} />
              </Form.Item>
            </FormGroup>
            <FormGroup title="대여 상태">
              <Form.Item>
                <DefaultText value={rental.status} />
              </Form.Item>
            </FormGroup>
            <FormGroup title="대여 생성 일시">
              <Form.Item>
                <DefaultText value={dayjs(rental.createdDate).format("YYYY/MM/DD HH:mm")} />
              </Form.Item>
            </FormGroup>
          </FormSection>
        )}

        {payment && (
          <FormSection title="결제 정보" description="결제 정보입니다.">
            <FormGroup title="결제 번호">
              <Form.Item>
                <DefaultText
                  value={
                    <Link href={`/payment/edit/${payment.id}`} className="text-black underline">
                      {payment.id}
                    </Link>
                  }
                />
              </Form.Item>
            </FormGroup>
            <FormGroup title="결제 금액">
              <Form.Item>
                <DefaultText value={`${payment.price.toLocaleString()}원`} />
              </Form.Item>
            </FormGroup>
            <FormGroup title="결제 종류">
              <Form.Item>
                <DefaultText value={getPaymentTypeLabel(payment.type)} />
              </Form.Item>
            </FormGroup>
            <FormGroup title="결제 상태">
              <Form.Item>
                <DefaultText value={getPaymentStateLabel(payment.status)} />
              </Form.Item>
            </FormGroup>
            <FormGroup title="결제 생성 일시">
              <Form.Item>
                <DefaultText value={dayjs(payment.createdDate).format("YYYY/MM/DD HH:mm")} />
              </Form.Item>
            </FormGroup>
          </FormSection>
        )}

        <FormSection title="유저 정보" description="문의 유저 정보입니다.">
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

          <FormGroup title="생성 일시">
            <Form.Item>
              <DefaultText value={dayjs(initialValues?.createdDate).format("YYYY/MM/DD HH:mm")} />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <div className="flex flex-row justify-center gap-2 text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
          <Button htmlType="button" type="default" onClick={() => router.back()}>
            뒤로
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(InquiryForm);
