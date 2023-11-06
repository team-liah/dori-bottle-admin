import { IPostFormValue, createPost, updatePost } from "@/client/post";
import QuillEditor from "@/components/shared/form/control/quill-editor";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { useAuth } from "@/lib/auth/auth-provider";
import { getErrorMessage } from "@/utils/error";
import { Button, Divider, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface INoticeFormProps {
  id?: string;
  initialValues?: Partial<IPostFormValue>;
}

const NoticeForm = ({ id, initialValues }: INoticeFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const { profile, mutateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFinish = async (formValue: IPostFormValue) => {
    try {
      setIsLoading(true);

      if (id) {
        await updatePost(id, { ...formValue, type: "NOTICE" });
        messageApi.success("수정되었습니다");
      } else {
        await createPost({ ...formValue, type: "NOTICE" });
        messageApi.success("생성되었습니다");
      }
      setTimeout(() => router.push("/post/notice/list"), 500);
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
        <FormSection title="기본정보" description="공지사항 기본 정보를 입력해주세요">
          <FormGroup title="제목*">
            <Form.Item name="title" rules={[{ required: true, message: "필수값입니다" }]}>
              <Input placeholder="제목을 입력하세요" />
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="내용*">
            <Form.Item name="content" rules={[{ required: true, message: "필수값입니다" }]}>
              <QuillEditor />
            </Form.Item>
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

export default React.memo(NoticeForm);
