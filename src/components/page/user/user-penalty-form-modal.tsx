import { IPenaltyFormValue, PENALTY_TYPES, getPenaltyTypeLabel, setUserPenalty } from "@/client/penalty";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import DefaultModal, { IDefaultModalProps } from "@/components/shared/ui/default-modal";
import { useAuth } from "@/lib/auth/auth-provider";
import { getErrorMessage } from "@/utils/error";
import { Button, Form, Input, Select, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useState } from "react";
import { mutate } from "swr";

interface IUserPenaltyFormProps extends IDefaultModalProps {
  id: React.Key;
}

const UserPenaltyFormModal = ({ id, handleHide, ...modalProps }: IUserPenaltyFormProps) => {
  const [form] = useForm();
  const { profile, mutateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: IPenaltyFormValue) => {
    try {
      setIsLoading(true);

      await setUserPenalty(id, formValue);
      messageApi.success("레드카드가 추가되었습니다");
      mutate(`/api/user/${id}`);
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
    <DefaultModal title="레드카드 추가" handleHide={handleHide} {...modalProps}>
      {contextHolder}
      <DefaultForm<IPenaltyFormValue> form={form} onFinish={handleFinish}>
        <FormGroup title="타입*">
          <Form.Item name="penaltyType" rules={[{ required: true, message: "필수값입니다" }]}>
            <Select placeholder="레드카드 타입을 선택하세요">
              {PENALTY_TYPES.map((type) => (
                <Select.Option key={type} value={type}>
                  {getPenaltyTypeLabel(type)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </FormGroup>
        <FormGroup title="사유">
          <Form.Item name="penaltyCause">
            <Input.TextArea placeholder="레드카드 사유를 입력하세요" />
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

export default React.memo(UserPenaltyFormModal);
