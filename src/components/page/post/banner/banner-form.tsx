import { IBannerFormValue, createBanner, updateBanner } from "@/client/banner";
import { uploadFile } from "@/client/util";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import ImagePreview from "@/components/shared/form/ui/image-preview";
import { useAuth } from "@/lib/auth/auth-provider";
import { getErrorMessage } from "@/utils/error";
import { getBase64 } from "@/utils/util";
import { Button, Divider, Form, Input, InputNumber, Radio, message } from "antd";
import { useForm, useWatch } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BannerPreview from "./banner-preview";

interface IBannerFormProps {
  id?: string;
  initialValues?: Partial<IBannerFormValue>;
}

const BannerForm = ({ id, initialValues }: IBannerFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const { profile, mutateProfile } = useAuth();
  const [imageFile, setImageFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: IBannerFormValue) => {
    try {
      setIsLoading(true);

      if (imageFile) {
        const result = await uploadFile(imageFile);
        formValue.imageUrl = result.url;
      }

      if (id) {
        await updateBanner(id, formValue);
        messageApi.success("수정되었습니다");
      } else {
        await createBanner(formValue);
        messageApi.success("생성되었습니다");
      }
      setTimeout(() => router.push("/post/banner/list"), 500);
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
      <DefaultForm<IBannerFormValue> form={form} initialValues={initialValues} onFinish={handleFinish}>
        <FormSection title="기본정보" description="베너 기본 정보를 입력해주세요">
          <FormGroup title="제목*">
            <Form.Item name="title" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input.TextArea cols={20} rows={2} wrap="hard" maxLength={40} placeholder="제목을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="내용*">
            <Form.Item name="content" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input.TextArea rows={3} placeholder="내용을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="이미지*">
            <Form.Item name="image">
              <ImagePreview
                initialValues={initialValues?.imageUrl}
                onChange={async (file) => {
                  const preview = await getBase64(file);
                  setImageFile(file);
                  setPreviewImage(preview);
                }}
              />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="배경색">
            <Form.Item name="backgroundColor">
              <Input type="color" placeholder="배경색을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="순서">
            <Form.Item name="priority">
              <InputNumber />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="노출여부">
            <Form.Item name="visible">
              <Radio.Group>
                <Radio value={true}>정상</Radio>
                <Radio value={false}>숨김</Radio>
              </Radio.Group>
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="링크">
            <Form.Item name="targetUrl">
              <Input placeholder="예시) /mypage, /notification 등" />
            </Form.Item>
          </FormGroup>
        </FormSection>

        <FormSection title="미리보기" description="실제 렌더링될 배너입니다.">
          <BannerPreview
            banner={{
              title: useWatch("title", form),
              content: useWatch("content", form),
              imageUrl: previewImage ?? form.getFieldValue("imageUrl"),
              backgroundColor: useWatch("backgroundColor", form),
              visible: useWatch("visible", form),
              priority: useWatch("priority", form),
            }}
          />
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

export default React.memo(BannerForm);
