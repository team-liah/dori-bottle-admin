import React from 'react';
import { AlertCircle } from 'react-feather';
import tw from 'tailwind-styled-components';

interface IValidationInputProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  maxLength?: number;
  width?: string;
  defaultValue?: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  prefix?: React.ReactNode;
  disable?: boolean;
  error?: string;
}

//#region Styled Component

const Container = tw.div`
  flex flex-col relative mb-1`;

const InputContainer = tw.div<{ $size?: 'sm' | 'md' | 'lg' }>`
  w-full h-[40px] text-[14px] flex flex-row items-center gap-3 px-4 bg-background-hover rounded-md overflow-hidden ${(
    props,
  ) =>
    props.$size === 'sm'
      ? 'h-[30px] text-[12px]'
      : props.$size === 'lg'
      ? 'h-[50px] text-[16px]'
      : ''}`;

const CustomInput = tw.input`
  w-full rounded-[4px] bg-[transparent] border-none focus:outline-none`;

const InvalidText = tw.div<{ $visible: boolean }>`
  text-[12px] text-red flex flex-row gap-1 items-center absolute bottom-[-24px] ${(
    props,
  ) => (props.$visible ? 'visible' : 'invisible')}`;

const InvalidIcon = tw(AlertCircle)`
  w-[12px] h-[12px] text-white fill-red `;

//#endregion

const ValidationInput = (props: IValidationInputProps) => {
  return (
    <Container>
      <InputContainer
        $size={props.size}
        style={{
          width: props.width,
        }}
      >
        {props.prefix}
        <CustomInput
          type={props.type}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          disabled={props.disable}
          maxLength={props.maxLength}
          value={props.value}
          onChange={props.onChange}
        />
      </InputContainer>
      <InvalidText $visible={props.error !== undefined}>
        <InvalidIcon />
        {props.error}
      </InvalidText>
    </Container>
  );
};

export default ValidationInput;
