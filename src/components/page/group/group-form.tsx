import { GROUP_TYPES, IGroupFormValue, createGroup, getGroupTypeLabel, updateGroup } from "@/client/group";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { useAuth } from "@/lib/auth/auth-provider";
import { getErrorMessage } from "@/utils/error";
import { Button, Divider, Form, Input, InputNumber, Select, Space, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface IGroupFormProps {
  id?: string;
  initialValues?: Partial<IGroupFormValue>;
}

const GroupForm = ({ id, initialValues }: IGroupFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const { profile, mutateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: IGroupFormValue) => {
    try {
      setIsLoading(true);

      if (id) {
        await updateGroup(id, formValue);
        messageApi.success("수정되었습니다");
      } else {
        await createGroup(formValue);
        messageApi.success("생성되었습니다");
      }
      setTimeout(() => router.push("/group/list"), 500);
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
      <DefaultForm<IGroupFormValue> form={form} initialValues={initialValues} onFinish={handleFinish}>
        <FormSection title="기본정보" description="기관 기본 정보를 입력해주세요">
          <FormGroup title="기관 종류*">
            <Form.Item name="type">
              <Select style={{ width: 200 }}>
                {GROUP_TYPES.map((type) => (
                  <Select.Option key={type} value={type}>
                    {getGroupTypeLabel(type)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="기관명*">
            <Form.Item name="name" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="기관명을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="할인율*">
            <Space direction="horizontal" size="middle" align="baseline">
              <Space.Compact>
                <Form.Item name="discountRate" rules={[{ required: true, message: "필수값입니다" }]}>
                  <InputNumber min={0} max={100} placeholder="할인율을 입력하세요" />
                </Form.Item>
              </Space.Compact>
            </Space>
          </FormGroup>
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

export default React.memo(GroupForm);
