import React from 'react';
import * as Icon from 'react-feather';
import tw from 'tailwind-styled-components';

interface IPagingProps {
  total: number;
  page: number;
  onChange: (page: number) => void;
}

//#region Styled Component

const Container = tw.div`
  flex flex-row items-center gap-2 select-none`;

const PrevButton = tw(Icon.ChevronLeft)`
  cursor-pointer bg-background-hover rounded-[3px] shadow-sm`;

const NextButton = tw(Icon.ChevronRight)`
  cursor-pointer bg-background-hover rounded-[3px] shadow-sm`;

const PageButton = tw.div<{ $isSelected?: boolean }>`
  w-6 h-6 flex items-center justify-center cursor-pointer rounded-[3px] ${(
    props,
  ) =>
    props.$isSelected ? 'bg-primary text-white' : 'hover:bg-background-hover'}`;

//#endregion

const Paging = (props: IPagingProps) => {
  return (
    <Container>
      <PrevButton
        onClick={() => props.onChange(props.page > 0 ? props.page - 1 : 0)}
      />
      {Array.from(Array(props.total).keys())
        .filter(
          (item) =>
            (props.page > props.total - 3
              ? item > props.total - 6
              : item > props.page - 3) &&
            (props.page < 2 ? item < 5 : item < props.page + 3),
        )
        .map((item, index) =>
          props.total > 5 ? (
            index === 3 && props.page < props.total - 3 ? (
              <PageButton key={item}>...</PageButton>
            ) : index === 4 ? (
              <PageButton
                key={item}
                $isSelected={item === props.page}
                onClick={() => props.onChange(props.total - 1)}
              >
                {props.total}
              </PageButton>
            ) : (
              <PageButton
                key={item}
                $isSelected={item === props.page}
                onClick={() => props.onChange(item)}
              >
                {item + 1}
              </PageButton>
            )
          ) : (
            <PageButton
              key={item}
              $isSelected={item === props.page}
              onClick={() => props.onChange(item)}
            >
              {item + 1}
            </PageButton>
          ),
        )}
      <NextButton
        onClick={() =>
          props.onChange(
            props.page < props.total - 1 ? props.page + 1 : props.page,
          )
        }
      />
    </Container>
  );
};

export default Paging;
