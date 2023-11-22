import { GROUP_TYPES, IGroupsParams, getGroupTypeLabel } from "@/client/group";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Form, Input, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const GroupSearch = () => {
  const [form] = useForm();
  const router = useRouter();

  const handleFinish = useCallback(
    (formValue: IGroupsParams) => {
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
            <Form.Item label="기관 권한" name="type" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                {GROUP_TYPES.map((role) => (
                  <Radio value={role} key={role}>
                    {getGroupTypeLabel(role)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="name">
              <Select>
                <Select.Option value="name">이름</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="keyword" className="grow">
              <Input placeholder="검색어를 입력해주세요" />
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

export default React.memo(GroupSearch);
