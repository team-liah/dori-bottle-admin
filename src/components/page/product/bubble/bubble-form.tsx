import { IPostFormValue } from "@/client/post";
import { IBubbleFormValue, createBubble } from "@/client/product";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormSection from "@/components/shared/form/ui/form-section";
import { useAuth } from "@/lib/auth/auth-provider";
import { getErrorMessage } from "@/utils/error";
import { Button, Divider, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface IBubbleFormProps {
  id?: string;
  initialValues?: Partial<IBubbleFormValue>;
}

const BubbleForm = ({ id, initialValues }: IBubbleFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const { profile, mutateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: IBubbleFormValue) => {
    try {
      setIsLoading(true);

      if (id) {
        // await updateBubble(id, formValue);
        // messageApi.success("수정되었습니다");
        messageApi.info("준비 중입니다.");
      } else {
        await createBubble(formValue);
        messageApi.success("생성되었습니다");
      }
      setTimeout(() => router.push("/cup/cup/list"), 500);
    } catch (e: unknown) {
      messageApi.error(await getErrorMessage(e));
    } finally {
      if (profile?.id === id) {
        mutateProfile?.();
      }
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  return (
    <>
      {contextHolder}
      <DefaultForm<IPostFormValue> form={form} initialValues={initialValues} onFinish={handleFinish}>
        <FormSection title="기본정보" description="버블 상품 기본 정보를 입력해주세요">
          <Divider />
        </FormSection>

        <div className="text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(BubbleForm);
