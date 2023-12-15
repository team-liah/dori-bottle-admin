import {
  IInquirysParams,
  INQUIRY_STATUSES,
  INQUIRY_TYPES,
  getInquiryStatusLabel,
  getInquiryTypeLabel,
} from "@/client/inquiry";
import { useUsersInfinity } from "@/client/user";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import SelectSearch from "@/components/shared/form/ui/select-search";
import { Button, Form, Input, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const InquirySearch = () => {
  const [form] = useForm();
  const router = useRouter();

  const handleFinish = useCallback(
    async (formValue: IInquirysParams) => {
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
            <Form.Item label="문의 종류" name="type" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                {INQUIRY_TYPES.map((type) => (
                  <Radio value={type} key={type}>
                    {getInquiryTypeLabel(type)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="처리 상태" name="status" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                {INQUIRY_STATUSES.map((status) => (
                  <Radio value={status} key={status}>
                    {getInquiryStatusLabel(status)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="회원명" name="userId">
              <SelectSearch
                placeholder="회원명을 검색해주세요"
                label={(data) => `${data.name} (${data.loginId.slice(9)})`}
                fetcher={useUsersInfinity}
              />
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="keyword">
              <Select>
                <Select.Option value="keyword">제목 및 내용</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="keyword" className="grow">
              <Input placeholder="키워드를 입력해주세요" />
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

export default React.memo(InquirySearch);
