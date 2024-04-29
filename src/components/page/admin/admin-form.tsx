import { ADMIN_ROLES, IAdminFormValue, createAdmin, getAdminRoleLabel, updateAdmin } from "@/client/admin";
import { GENDERS, getUserGenderLabel } from "@/client/user";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { Regex } from "@/constants/Regex";
import { useAuth } from "@/lib/auth/auth-provider";
import { getErrorMessage } from "@/utils/error";
import { getHypenTel } from "@/utils/util";
import { Button, Divider, Form, Input, Select, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AdminPasswordFormModal from "./admin-password-form-modal";

interface IAdminFormProps {
  id?: string;
  initialValues?: Partial<IAdminFormValue>;
}

const AdminForm = ({ id, initialValues }: IAdminFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const { profile, mutateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: IAdminFormValue) => {
    try {
      setIsLoading(true);

      if (formValue.loginPassword !== formValue.confirmPassword) {
        messageApi.error("비밀번호가 일치하지 않습니다");
        return;
      }

      const value = { ...formValue, gender: formValue.gender };

      if (id) {
        await updateAdmin(id, value);
        messageApi.success("수정되었습니다");
      } else {
        await createAdmin(value);
        messageApi.success("생성되었습니다");
      }
      setTimeout(() => router.push("/admin/list"), 500);
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
      <DefaultForm<IAdminFormValue> form={form} initialValues={initialValues} onFinish={handleFinish}>
        <FormSection title="기본정보" description="관리자 기본 정보를 입력해주세요">
          <FormGroup title="관리자 권한">
            {id ? (
              <Form.Item>{getAdminRoleLabel(initialValues?.role)}</Form.Item>
            ) : (
              <Form.Item name="role">
                <Select style={{ width: 200 }}>
                  {ADMIN_ROLES.map((role) => (
                    <Select.Option key={role} value={role}>
                      {getAdminRoleLabel(role)}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </FormGroup>

          <Divider />

          <FormGroup title="아이디*">
            <Form.Item name="loginId" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="아이디를 입력하세요" disabled={!!id} />
            </Form.Item>
          </FormGroup>

          <Divider />

          {!id ? (
            <>
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
            </>
          ) : (
            <FormGroup title="비밀번호*">
              <Button type="default" onClick={() => setOpenChangePasswordModal(true)}>
                비밀번호 변경
              </Button>
            </FormGroup>
          )}
          <Divider />

          <FormGroup title="관리자명*">
            <Form.Item name="name" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="관리자명을 입력하세요" />
            </Form.Item>
          </FormGroup>
        </FormSection>
        <FormSection title="추가정보" description="관리자 추가 정보를 입력해주세요">
          <FormGroup title="성별">
            <Form.Item name="gender">
              <Select>
                {GENDERS.map((gender) => (
                  <Select.Option value={gender} key={gender}>
                    {getUserGenderLabel(gender)}
                  </Select.Option>
                ))}
                <Select.Option value={null} key={"null"}>
                  알수없음
                </Select.Option>
              </Select>
            </Form.Item>
          </FormGroup>
          <FormGroup title="이메일">
            <Form.Item
              name="email"
              rules={[
                {
                  pattern: Regex.EMAIL_REGEX,
                  message: "이메일 형식이 올바르지 않습니다",
                },
              ]}
            >
              <Input placeholder="이메일을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="전화번호">
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  pattern: Regex.PHONE_NUMBER_REGEX,
                  message: "전화번호 형식이 올바르지 않습니다",
                },
              ]}
            >
              <Input
                maxLength={13}
                placeholder="전화번호를 입력하세요"
                onChange={(e) => form.setFieldsValue({ phoneNumber: getHypenTel(e.target.value) })}
              />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="메모">
            <Form.Item name="description">
              <Input.TextArea placeholder="메모를 입력하세요" rows={10} />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <div className="text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
      </DefaultForm>
      <AdminPasswordFormModal
        id={id!}
        open={openChangePasswordModal}
        handleHide={() => setOpenChangePasswordModal(false)}
      />
    </>
  );
};

export default React.memo(AdminForm);
