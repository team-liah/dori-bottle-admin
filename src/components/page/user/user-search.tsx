import { useGroups } from "@/client/group";
import { GENDERS, IUsersParams, getUserGenderLabel } from "@/client/user";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Form, Input, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const UserSearch = () => {
  const [form] = useForm();
  const router = useRouter();

  const handleFinish = useCallback(
    (formValue: IUsersParams) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, ...formValue },
      });
    },
    [router]
  );

  const { data } = useGroups({
    page: 0,
    size: 1000,
  });

  return (
    <DefaultSearchForm form={form} onFinish={handleFinish}>
      <FormSearch>
        <div>
          <FieldInline>
            <Form.Item label="활성 여부" name="active" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                <Radio value={true} key={"active"}>
                  활성
                </Radio>
                <Radio value={false} key={"inactive"}>
                  비활성
                </Radio>
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="블록 여부" name="blocked" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                <Radio value={false} key={"unblocked"}>
                  정상
                </Radio>
                <Radio value={true} key={"blocked"}>
                  정지
                </Radio>
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="성별" name="gender" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                {GENDERS.map((gender) => (
                  <Radio value={gender} key={gender}>
                    {getUserGenderLabel(gender)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="기관 이름" name="groupId" initialValue={"ALL"} className="w-full">
              <Select>
                <Select.Option value={"ALL"} key={"all"}>
                  전체
                </Select.Option>
                {data?.content.map((group) => (
                  <Select.Option value={group.id} key={group.id}>
                    {group.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="name" className="w-[200px]">
              <Select>
                <Select.Option value="name">이름</Select.Option>
                <Select.Option value="phoneNumber">전화번호</Select.Option>
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

export default React.memo(UserSearch);
