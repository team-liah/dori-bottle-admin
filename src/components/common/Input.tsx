import React from 'react';
import tw from 'tailwind-styled-components';

interface IInputProps {
  value?: string;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  width?: string;
  onChange?: (value: string) => void;
  prefix?: React.ReactNode;
  disable?: boolean;
}

//#region Styled Component

const Container = tw.div<{ $size?: 'sm' | 'md' | 'lg' }>`
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

//#endregion

const Input = (props: IInputProps) => {
  return (
    <Container
      $size={props.size}
      style={{
        width: props.width,
      }}
    >
      {props.prefix}
      <CustomInput
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disable}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </Container>
  );
};

export default Input;
