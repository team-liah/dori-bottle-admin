import { Modal } from 'antd';
import React from 'react';

interface IAlertProps {
  color?: 'blue' | 'red';
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCloseModal: () => void;
}

const Alert = (props: IAlertProps) => {
  return (
    <Modal
      open={props.open}
      onCancel={props.onCloseModal}
      footer={null}
      width={!props.onConfirm ? '346px' : '416px'}
      centered={true}
      closeIcon={<></>}
      zIndex={10000}
    >
      <div className="flex flex-col items-center justify-center gap-[27px] py-[12px] px-10">
        {props.title && (
          <div className="text-[16px] font-medium">{props.title}</div>
        )}
        <div className="whitespace-pre text-center text-[16px] leading-[1.75]">
          {props.message}
        </div>
        <div className="flex flex-row gap-[10px]">
          <button
            type="button"
            className={`flex items-center justify-center rounded-[3px] px-[30px] py-[10px]  text-center text-[13px] leading-4 ${
              props.onConfirm
                ? 'border-1 border-divider border-solid bg-white'
                : 'bg-primary text-white'
            } `}
            onClick={() => props.onCloseModal()}
          >
            <span className=" font-normal">
              {!props.onConfirm ? '확인' : '취소'}
            </span>
          </button>
          {props.onConfirm && (
            <button
              type="button"
              className={`flex items-center justify-center rounded-[3px] px-[30px] py-[10px] text-center text-[13px] leading-4 text-white ${
                props.color === 'red' ? 'bg-red' : 'bg-primary'
              }`}
              onClick={() => {
                props.onConfirm?.();
                props.onCloseModal();
              }}
            >
              <span className=" font-normal">
                {props.confirmText || '확인'}
              </span>
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Alert;
