import { CUP_STATUSES, ICupFormValue, createCup, getCupStateLabel, updateCup } from "@/client/cup";
import { IPostFormValue } from "@/client/post";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { useAuth } from "@/lib/auth/auth-provider";
import { getErrorMessage } from "@/utils/error";
import { Button, Form, Input, Select, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface ICollectionFormProps {
  id?: string;
  initialValues?: Partial<ICupFormValue>;
}

const CollectionForm = ({ id, initialValues }: ICollectionFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const { profile, mutateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: ICupFormValue) => {
    try {
      setIsLoading(true);

      if (id) {
        await updateCup(id, formValue);
        messageApi.success("수정되었습니다");
      } else {
        await createCup(formValue);
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
        <FormSection title="기본정보" description="컵 기본 정보를 입력해주세요">
          <FormGroup title="RFID.*">
            <Form.Item name="rfid" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="컵 RFID를 입력하세요" />
            </Form.Item>
          </FormGroup>
        </FormSection>

        {!!id && (
          <FormSection title="기타 정보" description="컵 상세 정보입니다.">
            <FormGroup title="컵 상태">
              <Form.Item name="status">
                <Select style={{ width: 200 }}>
                  {CUP_STATUSES.map((status) => (
                    <Select.Option key={status} value={status}>
                      {getCupStateLabel(status)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </FormGroup>
            <FormGroup title="생성 날짜">
              <Form.Item>{dayjs(initialValues?.createdDate).format("YYYY/MM/DD HH:mm")}</Form.Item>
            </FormGroup>

            <FormGroup title="수정 날짜">
              <Form.Item>{dayjs(initialValues?.lastModifiedDate).format("YYYY/MM/DD HH:mm")}</Form.Item>
            </FormGroup>
          </FormSection>
        )}

        <div className="text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
      </DefaultForm>
    </>
  );
};

export default React.memo(CollectionForm);
