import { useRouter } from 'next/router';
import React from 'react';
import { LogOut } from 'react-feather';
import tw from 'tailwind-styled-components';
import Breadcrumb from './Breadcrumb';

//#region Styled Component

const Container = tw.div`
  flex flex-row w-full bg-white justify-between items-center px-6 py-3`;

const LogoutContainer = tw.div`
  flex flex-row gap-2 text-medium text-gray-700 cursor-pointer`;

const LogoutIcon = tw(LogOut)`
  w-5 h-5 text-gray-700`;

//#endregion

const Header = () => {
  const router = useRouter();

  return (
    <Container>
      <Breadcrumb />
      <LogoutContainer
        onClick={() => {
          localStorage.removeItem('token');
          router.replace('/login');
        }}
      >
        <LogoutIcon />
        logout
      </LogoutContainer>
    </Container>
  );
};

export default Header;
