import React from 'react';
import tw from 'tailwind-styled-components';

interface IDashboardItemProps {
  title: string;
  children: React.ReactNode;
}

//#region Styled Component

const Container = tw.div`
  flex flex-col justify-center gap-4 p-6`;

const Header = tw.div`
  flex flex-row items-center justify-between`;

const Title = tw.span`
  text-md font-bold`;

//#endregion

const DashboardItem = (props: IDashboardItemProps) => {
  return (
    <Container>
      <Header>
        <Title>{props.title}</Title>
      </Header>
      {props.children}
    </Container>
  );
};

export default DashboardItem;
