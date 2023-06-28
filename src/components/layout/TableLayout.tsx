import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomComponent';

interface ITableLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

//#region Styled Component

const Container = tw.div`
  flex flex-col gap-6`;

//#endregion

const TableLayout = (props: ITableLayoutProps) => {
  return (
    <Container>
      <Custom.ShadowContainer>{props.header}</Custom.ShadowContainer>
      <Custom.ShadowContainer>{props.children}</Custom.ShadowContainer>
    </Container>
  );
};

export default TableLayout;
