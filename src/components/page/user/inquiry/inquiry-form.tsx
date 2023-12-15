import { IInquiry, answerInquiry, getInquiryStatusLabel, getInquiryTypeLabel } from "@/client/inquiry";
import { IPostFormValue } from "@/client/post";
import DefaultForm from "@/components/shared/form/ui/default-form";
import DefaultText from "@/components/shared/form/ui/default-text";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { getErrorMessage } from "@/utils/error";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
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
