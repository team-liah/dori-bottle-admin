import { useCollectionMachinesInfinity, useVendingMachinesInfinity } from "@/client/machine";
import { IRentalsParams, RENTAL_STATUSES, getRentalStateLabel } from "@/client/rental";
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

const RentalSearch = () => {
  const [form] = useForm();
  const router = useRouter();

  const handleFinish = useCallback(
    async (formValue: IRentalsParams) => {
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
            <Form.Item label="대여 상태" name="status" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                {RENTAL_STATUSES.map((status) => (
                  <Radio value={status} key={status}>
                    {getRentalStateLabel(status)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="지연 여부" name="expired" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                <Radio value={false} key={"false"}>
                  정상
                </Radio>
                <Radio value={true} key={"true"}>
                  지연
                </Radio>
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
            <Form.Item label="대여 위치" name="fromMachineId">
              <SelectSearch
                placeholder="자판기명을 검색해주세요"
                label={(data) => data.name}
                fetcher={useVendingMachinesInfinity}
              />
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="반납 위치" name="toMachineId">
              <SelectSearch
                placeholder="수거함명을 검색해주세요"
                label={(data) => data.name}
                fetcher={useCollectionMachinesInfinity}
              />
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="no">
              <Select>
                <Select.Option value="no">No.</Select.Option>
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

export default React.memo(RentalSearch);
