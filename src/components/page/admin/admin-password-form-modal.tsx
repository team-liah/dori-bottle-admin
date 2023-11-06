import { IAdminPasswordFormValue, updateAdminPassword } from "@/client/admin";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import DefaultModal, { IDefaultModalProps } from "@/components/shared/ui/default-modal";
import { useAuth } from "@/lib/auth/auth-provider";
import { getErrorMessage } from "@/utils/error";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";

interface IAdminPasswordFormProps extends IDefaultModalProps {
  id: React.Key;
}

const AdminPasswordFormModal = ({ id, handleHide, ...modalProps }: IAdminPasswordFormProps) => {
  const [form] = useForm();
  const { profile, mutateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: IAdminPasswordFormValue) => {
    try {
      setIsLoading(true);

      if (formValue.loginPassword !== formValue.confirmPassword) {
        messageApi.error("비밀번호가 일치하지 않습니다");
        return;
      }

      await updateAdminPassword(id, formValue);
      messageApi.success("수정되었습니다");
      setTimeout(() => handleHide(), 500);
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
    <DefaultModal title="비밀번호 변경" handleHide={handleHide} {...modalProps}>
      {contextHolder}
      <DefaultForm<IAdminPasswordFormValue> form={form} onFinish={handleFinish}>
        <FormGroup title="비밀번호*">
          <Form.Item name="loginPassword" rules={[{ required: true, message: "필수값입니다" }]}>
            <Input type="password" placeholder="비밀번호를 입력하세요" />
          </Form.Item>
        </FormGroup>
        <FormGroup title="비밀번호 확인*">
          <Form.Item name="confirmPassword" rules={[{ required: true, message: "필수값입니다" }]}>
            <Input type="password" placeholder="비밀번호를 다시 입력하세요" />
          </Form.Item>
        </FormGroup>

        <div className="text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
      </DefaultForm>
    </DefaultModal>
  );
};

export default React.memo(AdminPasswordFormModal);
