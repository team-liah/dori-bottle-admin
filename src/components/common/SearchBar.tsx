import React from 'react';
import { Search } from 'react-feather';
import tw from 'tailwind-styled-components';
import Input from './Input';

interface ISearchbarProps {
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
}

//#region Styled Component

const Container = tw.div`
  w-full px-6 py-6 flex items-center gap-4`;

const InputContainer = tw.div`
  flex flex-col w-full gap-2`;

const Label = tw.label`
  text-sm font-bold text-gray-700`;

const SearchIcon = tw(Search)`
  w-5 h-5 text-gray`;

//#endregion

const Searchbar = (props: ISearchbarProps) => {
  return (
    <Container>
      <InputContainer>
        <Label>What are you looking for?</Label>
        <Input
          prefix={<SearchIcon />}
          placeholder="Search for name"
          value={props.keyword}
          onChange={(value: string) => props.onChangeKeyword(value)}
        />
      </InputContainer>
    </Container>
  );
};

export default Searchbar;
