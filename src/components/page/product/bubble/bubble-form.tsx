import { IPostFormValue } from "@/client/post";
import { IBubbleFormValue, createBubble, updateBubble } from "@/client/product";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { useAuth } from "@/lib/auth/auth-provider";
import { getErrorMessage } from "@/utils/error";
import { Button, Checkbox, DatePicker, Divider, InputNumber, Space, message } from "antd";
import { Form } from "antd/lib";
import { useForm } from "antd/lib/form/Form";
import dayjs from "dayjs";
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
  const priceValue = Form.useWatch("price", form);
  const discountValue = Form.useWatch("discountRate", form);
  const [messageApi, contextHolder] = message.useMessage();
  const [isExpired, setIsExpired] = useState(false);
  const [isDiscountExpired, setIsDiscountExpired] = useState(false);

  const handleFinish = async (formValue: IBubbleFormValue) => {
    try {
      setIsLoading(true);

      if (id) {
        await updateBubble(id, formValue);
        messageApi.success("수정되었습니다");
      } else {
        await createBubble(formValue);
        messageApi.success("생성되었습니다");
      }
      setTimeout(() => router.push("/product/bubble/list"), 500);
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
          <FormGroup title="버블 개수*">
            <Space direction="horizontal" size="middle" align="baseline">
              <Space.Compact>
                <Form.Item name="amounts" rules={[{ required: true, message: "필수값입니다" }]}>
                  <InputNumber min={1} max={1000} placeholder="버블 개수를 입력하세요" />
                </Form.Item>
              </Space.Compact>
            </Space>
          </FormGroup>
          <Divider />
          <FormGroup title="가격*">
            <Space direction="horizontal" size="middle" align="baseline">
              <Space.Compact>
                <Form.Item name="price" rules={[{ required: true, message: "필수값입니다" }]}>
                  <InputNumber min={1000} max={10000000} placeholder="상품 가격을 입력하세요" />
                </Form.Item>
              </Space.Compact>
            </Space>
          </FormGroup>
          <Divider />
          <FormGroup title={`만료일시\n(미설정 시 무제한)`}>
            <div className="hidden">
              <Form.Item name="expiredDate"></Form.Item>
            </div>
            <Space direction="horizontal" size="middle" align="baseline">
              <Space.Compact>
                <DatePicker
                  allowClear={true}
                  defaultValue={initialValues?.expiredDate ? dayjs(initialValues?.expiredDate) : undefined}
                  onChange={(date) => form.setFieldsValue({ expiredDate: date?.endOf("day") })}
                  disabled={isExpired}
                />
              </Space.Compact>
              <Space.Compact>
                <Checkbox
                  checked={isExpired}
                  onChange={(e) => {
                    setIsExpired(e.target.checked);
                    form.setFieldsValue({ expiredDate: dayjs().add(-1, "day").endOf("day") });
                  }}
                >
                  만료
                </Checkbox>
              </Space.Compact>
            </Space>
          </FormGroup>
        </FormSection>

        <FormSection title="할인정보" description="버블 상품 할인 정보를 입력해주세요">
          <FormGroup title="할인율">
            <Space direction="horizontal" size="middle" align="baseline">
              <Space.Compact>
                <Form.Item name="discountRate" rules={[{ required: true, message: "필수값입니다" }]}>
                  <InputNumber min={0} max={100} placeholder="버블 개수를 입력하세요" />
                </Form.Item>
              </Space.Compact>
            </Space>
          </FormGroup>
          <FormGroup title="최종가격">
            <Space direction="horizontal" size="middle" align="baseline">
              <Space.Compact>
                <Form.Item>
                  <span className="block">
                    {priceValue && discountValue
                      ? Math.floor(priceValue - (priceValue * discountValue) / 100).toLocaleString()
                      : priceValue?.toLocaleString()}
                    원
                  </span>
                </Form.Item>
              </Space.Compact>
            </Space>
          </FormGroup>
          <Divider />
          <FormGroup title={`할인 만료일시\n(미설정 시 무제한)`}>
            <div className="hidden">
              <Form.Item name="discountExpiredDate"></Form.Item>
            </div>
            <Space direction="horizontal" size="middle" align="baseline">
              <Space.Compact>
                <DatePicker
                  allowClear={true}
                  defaultValue={
                    initialValues?.discountExpiredDate ? dayjs(initialValues?.discountExpiredDate) : undefined
                  }
                  onChange={(date) => form.setFieldsValue({ discountExpiredDate: date?.endOf("day") })}
                  disabled={isDiscountExpired}
                />
              </Space.Compact>
              <Space.Compact>
                <Checkbox
                  checked={isDiscountExpired}
                  onChange={(e) => {
                    setIsDiscountExpired(e.target.checked);
                    form.setFieldsValue({ discountExpiredDate: dayjs().add(-1, "day").endOf("day") });
                  }}
                >
                  만료
                </Checkbox>
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

export default React.memo(BubbleForm);
