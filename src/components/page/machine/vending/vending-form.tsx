import {
  IMachine,
  IMachineFormValue,
  MACHINE_STATES,
  createMachine,
  getMachineStateLabel,
  updateMachine,
} from "@/client/machine";
import { IPostFormValue } from "@/client/post";
import { uploadFile } from "@/client/util";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import ImagePreview from "@/components/shared/form/ui/image-preview";
import { useAuth } from "@/lib/auth/auth-provider";
import { getErrorMessage } from "@/utils/error";
import { Button, Divider, Form, Input, Select, Space, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import NaverMap from "../common/naver-map";

interface IVendingFormProps {
  id?: string;
  initialValues?: Partial<IMachineFormValue>;
}

const VendingForm = ({ id, initialValues }: IVendingFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const { profile, mutateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: IMachineFormValue) => {
    try {
      setIsLoading(true);

      if (imageFile) {
        const result = await uploadFile(imageFile);
        formValue.imageUrl = result.url;
      }

      if (id) {
        await updateMachine(id, {
          ...formValue,
          type: "VENDING",
          address: {
            zipCode: formValue.address.zipCode,
            address1: formValue.address.address1,
            address2: formValue.address.address2,
          },
        });
        messageApi.success("수정되었습니다");
      } else {
        await createMachine({
          ...formValue,
          type: "VENDING",
          address: {
            zipCode: formValue.address.zipCode,
            address1: formValue.address.address1,
            address2: formValue.address.address2,
          },
        });
        messageApi.success("생성되었습니다");
      }
      setTimeout(() => router.push("/machine/vending/list"), 500);
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
        <div className="flex flex-col gap-4 md:flex-row">
          <FormSection title="기본정보" description="자판기 기본 정보를 입력해주세요">
            <FormGroup title="No.*">
              <Form.Item name="no" rules={[{ required: true, message: "필수값입니다" }]}>
                <Input placeholder="자판기 고유번호를 입력하세요" />
              </Form.Item>
            </FormGroup>
            <Divider />
            <FormGroup title="이름*">
              <Form.Item name="name" rules={[{ required: true, message: "필수값입니다" }]}>
                <Input placeholder="이름을 입력하세요" />
              </Form.Item>
            </FormGroup>
            <Divider />
            <FormGroup title="주소*">
              <Form.Item name={["address", "zipCode"]} rules={[{ required: true, message: "필수값입니다" }]}>
                <Input placeholder="우편번호를 입력해주세요" />
              </Form.Item>
              <Form.Item name={["address", "address1"]} rules={[{ required: true, message: "필수값입니다" }]}>
                <Input placeholder="주소를 입력해주세요" />
              </Form.Item>
              <Form.Item name={["address", "address2"]}>
                <Input placeholder="추가 주소를 입력해주세요" />
              </Form.Item>
            </FormGroup>
            <Divider />
            <FormGroup title="이미지">
              <Form.Item name="imageUrl">
                <ImagePreview initialValues={initialValues?.imageUrl} onChange={(file) => setImageFile(file)} />
              </Form.Item>
            </FormGroup>
            <Divider />

            <FormGroup title="컵 개수*">
              <Space direction="horizontal" size="middle" align="baseline">
                {!!id && <span className="block">{initialValues?.cupAmounts || 0} /</span>}
                <Space.Compact>
                  <Form.Item name="capacity" rules={[{ required: true, message: "필수값입니다" }]}>
                    <Input type="number" placeholder="최대 수용량을 입력하세요" />
                  </Form.Item>
                </Space.Compact>
              </Space>
            </FormGroup>
          </FormSection>
          <FormSection title="위치정보" description="자판기 위치 정보를 입력해주세요">
            <Space>
              <Form.Item name={["location", "latitude"]}>
                <Input placeholder="추가 주소를 입력해주세요" />
              </Form.Item>
              <Form.Item name={["location", "longitude"]}>
                <Input placeholder="추가 주소를 입력해주세요" />
              </Form.Item>
            </Space>
            <NaverMap
              initialValues={initialValues as IMachine}
              onChagePosition={(x, y) => form.setFieldsValue({ location: { longitude: x, latitude: y } })}
            />
          </FormSection>
        </div>

        {!!id && (
          <FormSection title="기타 정보" description="자판기 상세 정보입니다.">
            <FormGroup title="기기 상태">
              <Form.Item name="state">
                <Select style={{ width: 200 }}>
                  {MACHINE_STATES.map((status) => (
                    <Select.Option key={status} value={status}>
                      {getMachineStateLabel(status)}
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

export default React.memo(VendingForm);
