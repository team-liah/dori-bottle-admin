import { Select } from "antd";
import { ComponentProps, ReactNode, useState } from "react";
import { SWRInfiniteResponse } from "swr/infinite";

interface ISelectSearchProps extends ComponentProps<typeof Select> {
  fetcher: (params?: any) => SWRInfiniteResponse<any, any>; // Adjust the return type as needed
  label: (data: any) => ReactNode; // Adjust the type of data as needed
}

const SelectSearch = (props: ISelectSearchProps) => {
  const [filter, setFilter] = useState("");

  const { data, size, setSize } = props.fetcher({
    name: filter,
    size: 5,
  });

  const selectProps = {
    ...props,
    fetcher: undefined,
    label: undefined,
  };

  const handleScroll = (e: any) => {
    if (!data?.at(-1)?.pageable.hasNext) return;
    if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
      setSize(size + 1);
    }
  };

  return (
    <Select
      {...selectProps}
      showSearch
      allowClear
      className="min-w-[200px]"
      placeholder={props.placeholder || "검색"}
      filterOption={(input, option) => {
        // filterOption={true}만 세팅할 경우 value가 자동 필터링
        return true;
      }}
      onSearch={(value) => setFilter(value)}
      onDropdownVisibleChange={(open) => {
        if (!open) {
          setFilter("");
        }
      }}
      options={data
        ?.flatMap((response) => response.content)
        .map((data) => ({ label: props.label(data), value: data.id }))}
      listHeight={150}
      onPopupScroll={handleScroll}
    />
  );
};

export default SelectSearch;
