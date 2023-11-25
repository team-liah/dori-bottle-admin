import { CUP_STATUSES, ICupsParams, getCupStateLabel } from "@/client/cup";
import DefaultSearchForm from "@/components/shared/form/ui/default-search-form";
import FieldInline from "@/components/shared/form/ui/field-inline";
import FormSearch from "@/components/shared/form/ui/form-search";
import useNFCReader from "@/hooks/useNFCReader";
import { Button, Form, Input, Radio, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

const CupSearch = () => {
  const [form] = useForm();
  const router = useRouter();
  const { scanning, onScanning, stopScanning } = useNFCReader();

  const handleFinish = useCallback(
    async (formValue: ICupsParams) => {
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
            <Form.Item label="컵 상태" name="status" initialValue={"ALL"}>
              <Radio.Group>
                <Radio value={"ALL"} key={"ALL"}>
                  전체
                </Radio>
                {CUP_STATUSES.map((role) => (
                  <Radio value={role} key={role}>
                    {getCupStateLabel(role)}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </FieldInline>
          <FieldInline>
            <Form.Item label="검색조건" name="searchType" initialValue="rfid">
              <Select>
                <Select.Option value="rfid">rfid.</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="keyword" className="grow">
              <Input placeholder="키워드를 입력해주세요" />
            </Form.Item>
            <Button
              className="mb-4"
              onClick={() =>
                scanning
                  ? stopScanning()
                  : onScanning((serialNumber) =>
                      handleFinish({
                        searchType: "rfid",
                        keyword: serialNumber,
                      })
                    )
              }
            >
              {scanning ? "취소" : "스캔"}
            </Button>
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

export default React.memo(CupSearch);
