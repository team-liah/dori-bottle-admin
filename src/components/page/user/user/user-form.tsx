import { useGroups } from "@/client/group";
import { deleteUserBlockCause, deleteUserPenalty, getBlockCauseTypeLabel, getPenaltyTypeLabel } from "@/client/penalty";
import { IUser, IUserFormValue, getUserGenderLabel, updateUser } from "@/client/user";
import DefaultForm from "@/components/shared/form/ui/default-form";
import FormGroup from "@/components/shared/form/ui/form-group";
import FormSection from "@/components/shared/form/ui/form-section";
import { getErrorMessage } from "@/utils/error";
import { Button, Divider, Form, Input, Popconfirm, Popover, Select, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { XCircleIcon } from "lucide-react";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { mutate } from "swr";
import UserPenaltyDetail from "./user-penalty-detail";
import UserPenaltyFormModal from "./user-penalty-form-modal";

interface IUserFormProps {
  id: string;
  initialValues?: Partial<IUser>;
}

const UserForm = ({ id, initialValues }: IUserFormProps) => {
  const router = useRouter();
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [openChangePenaltyModal, setOpenChangePenaltyModal] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: groups } = useGroups({
    page: 0,
    size: 1000,
  });

  const handleFinish = async (formValue: IUserFormValue) => {
    try {
      setIsLoading(true);

      if (id) {
        await updateUser(id, {
          ...formValue,
          groupId: formValue.groupId === "none" ? null : formValue.groupId,
        });
        messageApi.success("수정되었습니다");
      }

      setTimeout(() => router.push("/user/user/list"), 500);
    } catch (e: unknown) {
      messageApi.error(await getErrorMessage(e));
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleDeletePenalty = useCallback(
    async (penaltyIds: React.Key[]) => {
      try {
        await deleteUserPenalty(id!, penaltyIds);
        mutate(
          `/api/user/${id}`,
          {
            ...initialValues,
            penalties: initialValues?.penalties?.filter((penalty) => !penaltyIds.includes(penalty.id)),
          },
          false
        );
        messageApi.success("레드카드가 삭제되었습니다.");
      } catch (error) {
        messageApi.error("레드카드 삭제에 실패했습니다.");
      }
    },
    [id, messageApi, initialValues]
  );

  const handleDeleteBlock = useCallback(
    async (blockIds: React.Key[]) => {
      try {
        await deleteUserBlockCause(id!, blockIds);
        mutate(
          `/api/user/${id}`,
          {
            ...initialValues,
            blockedCauses: initialValues?.blockedCauses?.filter((block) => !blockIds.includes(block.id)),
          },
          false
        );
        messageApi.success("블락 상태가 삭제되었습니다.");
      } catch (error) {
        messageApi.error("블락 상태 삭제에 실패했습니다.");
      }
    },
    [id, messageApi, initialValues]
  );

  return (
    <>
      {contextHolder}
      <DefaultForm<IUser> form={form} initialValues={initialValues} onFinish={handleFinish}>
        <FormSection title="기본정보" description="회원 기본 정보를 입력해주세요">
          <FormGroup title="이름*">
            <Form.Item>{initialValues?.name || "-"}</Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="전화번호*">
            <Form.Item>{initialValues?.phoneNumber || "-"}</Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="생년월일*">
            <Form.Item>
              {initialValues?.birthDate?.slice(0, 4)}.{initialValues?.birthDate?.slice(4, 6)}.
              {initialValues?.birthDate?.slice(6, 8)} {getUserGenderLabel(initialValues?.gender)}
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="활성 여부">
            <Form.Item>{initialValues?.active ? "활성" : "비활성"}</Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="기관">
            <Form.Item name="groupId" initialValue={initialValues?.group?.id || "none"}>
              <Select>
                <Select.Option value={"none"} key={"all"}>
                  설정 안함
                </Select.Option>
                {groups?.content.map((group) => (
                  <Select.Option value={group.id} key={group.id}>
                    {group.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="메모">
            <Form.Item name="description">
              <Input.TextArea placeholder="메모를 입력하세요" rows={5} />
            </Form.Item>
          </FormGroup>
        </FormSection>
        <div className="mb-4 text-center">
          <Button htmlType="submit" type="primary" loading={isLoading}>
            저장
          </Button>
        </div>
        <FormSection title="패널티 정보" description="회원 패널티 정보를 입력해주세요">
          <FormGroup title="블락 상태">
            <Form.Item>
              <span className="mr-1">{initialValues?.blocked ? "이용 불가" : "이용 가능"}</span>
              <Divider type="vertical" />
              <div className="flex flex-wrap gap-2 py-4">
                {initialValues?.blocked &&
                  initialValues?.blockedCauses?.map((cause) => (
                    <div
                      key={cause.id}
                      className={`w-fit flex flex-row items-center gap-1 px-2 py-1 text-xs bg-red-500 text-white rounded-md cursor-pointer`}
                    >
                      {getBlockCauseTypeLabel(cause.type)}
                      <Popconfirm
                        title="블락를 삭제하시겠습니까?"
                        onConfirm={() => handleDeleteBlock([cause.id])}
                        okText="삭제"
                        cancelText="취소"
                      >
                        <XCircleIcon size={12} />
                      </Popconfirm>
                    </div>
                  ))}
              </div>
            </Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="레드카드">
            <Form.Item>
              <Button type="default" onClick={() => setOpenChangePenaltyModal(true)}>
                레드카드 추가
              </Button>
              <Divider type="vertical" />
              <div className="flex flex-wrap gap-2 py-4">
                {initialValues?.penalties?.map((record) => (
                  <Popover key={record.id} placement="bottomLeft" content={<UserPenaltyDetail penalty={record} />}>
                    <div
                      className={`flex flex-row items-center gap-1 px-2 py-1 text-xs bg-red-300 rounded-md cursor-pointer  ${
                        record.disabled && "opacity-50"
                      }`}
                    >
                      {getPenaltyTypeLabel(record.type)}
                      {!record.disabled && (
                        <Popconfirm
                          title="레드카드를 삭제하시겠습니까?"
                          onConfirm={() => handleDeletePenalty([record.id])}
                          okText="삭제"
                          cancelText="취소"
                        >
                          <XCircleIcon size={12} />
                        </Popconfirm>
                      )}
                    </div>
                  </Popover>
                ))}
              </div>
            </Form.Item>
          </FormGroup>
        </FormSection>

        <FormSection title="초대정보" description="회원 초대 정보를 입력해주세요">
          <FormGroup title="초대코드">
            <Form.Item>{initialValues?.invitationCode || "-"}</Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="초대 수">
            <Form.Item>{initialValues?.invitationCount || 0}</Form.Item>
          </FormGroup>

          <Divider />

          <FormGroup title="초대코드 입력 여부">
            <Form.Item>{initialValues?.inviterId ? "입력 완료" : "미입력"}</Form.Item>
          </FormGroup>
        </FormSection>
      </DefaultForm>
      <UserPenaltyFormModal
        id={id!}
        open={openChangePenaltyModal}
        handleHide={() => setOpenChangePenaltyModal(false)}
      />
    </>
  );
};

export default React.memo(UserForm);
