import React from 'react';
import * as Icon from 'react-feather';
import tw from 'tailwind-styled-components';
import SidebarCategoryItem from './SidebarCategoryItem';
import LogoSvg from '@/svg/LogoSvg';

//#region Styled Component

const Container = tw.div`
  w-[256px] h-full bg-navy flex flex-col`;

const LogoContainer = tw.div`
  flex items-center justify-center gap-3 h-[64px] bg-navy-light`;

const LogoText = tw.div`
  text-white text-[16px] font-bold`;

const MenuContainer = tw.div`
  flex flex-col gap-6 px-6 py-8`;
//#endregion

const categoryList = [
  {
    categoryName: 'DASHBOARD',
    priority: 0,
    menuList: [
      {
        name: 'Dashboard',
        icon: <Icon.Grid className="h-5 w-5" />,
        path: '/dashboard',
      },
    ],
  },
  {
    categoryName: 'USER',
    priority: 1,
    menuList: [
      {
        name: 'User',
        icon: <Icon.Users className="h-5 w-5" />,
        path: '/user/user',
      },
      {
        name: 'Report',
        icon: <Icon.AlertTriangle className="h-5 w-5" />,
        path: '/user/report',
      },
      {
        name: 'Question',
        icon: <Icon.HelpCircle className="h-5 w-5" />,
        path: '/user/question',
      },
    ],
  },
  {
    categoryName: 'PURCHASE',
    priority: 2,
    menuList: [
      {
        name: 'Purchase',
        icon: <Icon.CreditCard className="h-5 w-5" />,
        path: '/purchase/purchase',
      },
    ],
  },
];
const Sidebar = () => {
  return (
    <Container>
      <LogoContainer>
        <LogoSvg width={36} height={36} />
        <LogoText>Dori Bottle</LogoText>
      </LogoContainer>
      <MenuContainer>
        {categoryList
          .sort((a, b) => a.priority - b.priority)
          .map((category) => (
            <SidebarCategoryItem key={category.categoryName} {...category} />
          ))}
      </MenuContainer>
    </Container>
  );
};

export default Sidebar;
