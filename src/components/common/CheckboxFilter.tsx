import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useEffect, useState } from 'react';
import tw from 'tailwind-styled-components';

interface ICheckboxFilterProps {
  title: string;
  options: { id: string; name: string }[];
  value: CheckboxValueType[];
  onChange: (value: CheckboxValueType[]) => void;
}

//#region Styled Component

const Container = tw.div`
  w-full px-6 py-6 flex items-center gap-4`;

const InputContainer = tw.div`
  flex flex-col w-full gap-2`;

const Label = tw.label`
  text-sm font-bold text-gray-700`;

//#endregion

const CheckboxFilter = (props: ICheckboxFilterProps) => {
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setIndeterminate(
      !!props.value.length && props.value.length < props.options.length,
    );
    setCheckAll(props.value.length === props.options.length);
  }, [props.value, props.options]);

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    props.onChange(
      e.target.checked ? props.options.map((option) => option.id) : [],
    );
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <Container>
      <InputContainer>
        <Label>{props.title}</Label>
        <div className="flex flex-row gap-2">
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            전체
          </Checkbox>
          <Checkbox.Group
            value={props.value}
            onChange={(value) => props.onChange(value)}
          >
            {props.options.map((option, index) => (
              <Checkbox key={index} value={option.id}>
                {option.name}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      </InputContainer>
    </Container>
  );
};

export default CheckboxFilter;
