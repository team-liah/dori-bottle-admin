import React from 'react';
import tw from 'tailwind-styled-components';
import Sidebar from '../Sidebar';
import Header from '../common/Header';

interface ISidebarLayoutProps {
  children: React.ReactNode;
}

//#region Styled Component

const Container = tw.div`
  w-full h-screen flex flex-row`;

const ContentContainer = tw.div`
  w-full flex flex-col`;

const Content = tw.div`
  w-full h-full overflow-auto p-6 bg-background-light`;

//#endregion

const SidebarLayout = (props: ISidebarLayoutProps) => {
  return (
    <Container>
      <Sidebar />
      <ContentContainer>
        <Header />
        <Content>{props.children}</Content>
      </ContentContainer>
    </Container>
  );
};

export default SidebarLayout;
