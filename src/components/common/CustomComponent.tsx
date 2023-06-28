import {
  DatePicker as AntdDatePicker,
  TimePicker as AntdTimePicker,
} from 'antd';
import tw from 'tailwind-styled-components';

export const TitleContainer = tw.div`
  flex flex-row mb-6 justify-between items-center`;

export const Title = tw.div`
  text-[24px] font-extrabold`;

export const ButtonContainer = tw.div`
  flex flex-row gap-4`;

export const Button = tw.button<{ $size?: 'sm' | 'md' | 'lg' }>`
  w-[150px] h-[40px] rounded-lg bg-primary text-[14px] text-white font-bold ${(
    props,
  ) =>
    props.$size === 'sm'
      ? 'w-[100px] h-[30px] text-[10px]'
      : props.$size === 'lg'
      ? 'w-[200px] h-[50px] text-[16px]'
      : ''}"}`;

export const CreateButton = tw(Button)`
  bg-primary`;

export const DeleteButton = tw(Button)`
  bg-red`;

export const UploadButton = tw(Button)`
  bg-white text-gray border-[1px] border-solid border-gray`;

export const ShadowContainer = tw.div`
  w-full h-fit bg-white rounded-xl overflow-hidden shadow-md`;

export const DropdownContainer = tw.div<{ $disabled?: boolean }>`
  w-[300px] h-[40px] text-[14px] cursor-pointer flex flex-row justify-between items-center gap-3 px-4 bg-background-hover rounded-md overflow-hidden ${(
    props,
  ) => (props.$disabled ? 'bg-[#E6E6E6]' : '')}`;

export const DropdownMenuContainer = tw.div`
  w-[200px] h-[30px] text-[14px] flex flex-row items-center rounded-md overflow-hidden`;

export const RequireCircle = tw.div`
  w-[4px] h-[4px] rounded-full bg-red inline-block ml-1 align-text-top`;

export const Input = tw.input`
  w-full h-[40px] bg-[transparent] border-none focus:outline-none bg-background-hover rounded-md px-4 text-[14px] disabled:bg-[#E6E6E6]`;

export const DatePicker = tw(AntdDatePicker)`
  w-full h-[40px] bg-[transparent] border-none focus:outline-none bg-background-hover rounded-md px-4 text-[14px] disabled:bg-[#E6E6E6]`;

export const TimePicker = tw(AntdTimePicker)`
  w-full h-[40px] bg-[transparent] border-none focus:outline-none bg-background-hover rounded-md px-4 text-[14px] disabled:bg-[#E6E6E6]`;

export const StyledTableRow = tw.tr<{ $disabled?: boolean }>`
  cursor-pointer bg-white ${(props) =>
    props.$disabled ? 'bg-[#E6E6E6]' : 'hover:bg-background-hover'}`;

export const StyledTableData = tw.td<{
  $align?: 'left' | 'center';
  $link?: boolean;
}>`
  px-4 py-3 truncate ${(props) =>
    props.$align === 'center' ? 'text-center' : 'text-left'} ${(props) =>
  props.$link ? 'underline underline-offset-2 hover:text-blue' : ''}`;

export const Memo = tw.div`
  mt-4 text-[14px] text-gray`;
