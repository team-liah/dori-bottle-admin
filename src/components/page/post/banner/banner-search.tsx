import { IBannersParams } from "@/client/banner";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Form, Input, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const BannerSearch = () => {
  const [form] = useForm();
  const router = useRouter();

  const handleFinish = useCallback(
    (formValue: IBannersParams) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...formValue },
      });
    },
    [router]
  );

  return (
    <DefaultSearchForm form={form} onFinish={handleFinish}>
      <FormSearch>
        <div>
          <FieldInline>
            <Form.Item label="노출 여부" name="visible" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                <Radio value={true} key={"true"}>
                  정상
                </Radio>
                <Radio value={false} key={"false"}>
                  숨김
                </Radio>
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="title">
              <Select popupMatchSelectWidth={false}>
                <Select.Option value="title">제목</Select.Option>
                <Select.Option value="content">내용</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="keyword" className="grow">
              <Input placeholder="제목 또는 내용을 입력해주세요" />
            </Form.Item>
          </FieldInline>
        </div>
      </FormSearch>
      <div className="flex justify-center gap-2">
        <Button htmlType="submit" className="btn-with-icon" icon={<Search />}>
          검색
        </Button>
        <Button htmlType="submit" className="btn-with-icon" onClick={() => form.resetFields()}>
          초기화
        </Button>
      </div>
    </DefaultSearchForm>
  );
};

export default React.memo(BannerSearch);
