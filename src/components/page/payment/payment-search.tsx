import {
  IPaymentsParams,
  PAYMENT_STATUSES,
  PAYMENT_TYPES,
  getPaymentStateLabel,
  getPaymentTypeLabel,
} from "@/client/payment";
import DateRangeField from "@/components/shared/form/control/date-range-field";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import { Button, Form, Radio } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const PaymentSearch = () => {
  const [form] = useForm();
  const router = useRouter();

  const handleFinish = useCallback(
    async (formValue: IPaymentsParams) => {
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
            <Form.Item label="결제 상태" name="status" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                {PAYMENT_STATUSES.map((status) => (
                  <Radio value={status} key={status}>
                    {getPaymentStateLabel(status)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="결제 종류" name="type" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                {PAYMENT_TYPES.map((type) => (
                  <Radio value={type} key={type}>
                    {getPaymentTypeLabel(type)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="승인 일자" name="approvedDate">
              <DateRangeField />
            </Form.Item>
          </FieldInline>
          {/* <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="userId">
              <Select>
                <Select.Option value="userId">유저 ID</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="keyword" className="grow">
              <Input placeholder="키워드를 입력해주세요" />
            </Form.Item>
          </FieldInline> */}
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

export default React.memo(PaymentSearch);
