import { Input, Popconfirm } from "antd";
import { useState } from "react";

interface PopconfirmWithInputProps {
  title: string;
  onConfirm: (value: string) => void;
  children: React.ReactNode;
  inputProps?: React.ComponentProps<typeof Input>;
}

const PopconfirmWithInput = (props: PopconfirmWithInputProps) => {
  const { title, onConfirm, children, inputProps } = props;
  const [value, setValue] = useState("");

  const handleConfirm = () => {
    onConfirm(value);
  };

  return (
    <Popconfirm
      title={
        <div className="flex flex-col gap-2">
          <span>{title}</span>
          <Input {...inputProps} value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      }
      onConfirm={handleConfirm}
    >
      <span>{children}</span>
    </Popconfirm>
  );
};
