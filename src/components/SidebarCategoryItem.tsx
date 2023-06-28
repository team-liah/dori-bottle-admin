import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import { TMenuItem } from '@/types/menu';

interface ISidebarCategoryItemProps {
  categoryName: string;
  menuList: TMenuItem[];
}

//#region Styled Component

const Container = tw.div`
  flex flex-col gap-2`;

const CategoryName = tw.div`
  text-[#3A3D5F] text-[12px] font-bold py-1 mx-4 border-b-[1.5px] border-solid border-[#3A3D5F]`;

const MenuContainer = tw.div`
  flex flex-col`;

const MenuItemContainer = tw.div<{ $isSelected: boolean }>`
  flex flex-row items-center gap-3 px-4 py-3 select-none cursor-pointer rounded-md ${(
    props,
  ) =>
    props.$isSelected
      ? 'bg-[#5A6EEF] text-[#E0E0E0]'
      : 'text-[#7E819E] hover:bg-navy-light'}`;

const MenuName = tw.span`
  leading-0 font-bold`;

//#endregion

const SidebarCategoryItem = (props: ISidebarCategoryItemProps) => {
  const router = useRouter();

  return (
    <Container>
      <CategoryName>{props.categoryName}</CategoryName>
      <MenuContainer>
        {props.menuList.map((menu) => (
          <MenuItemContainer
            key={menu.name}
            $isSelected={router.asPath.includes(menu.path)}
            onClick={() => router.push(menu.path)}
          >
            {menu.icon}
            <MenuName>{menu.name}</MenuName>
          </MenuItemContainer>
        ))}
      </MenuContainer>
    </Container>
  );
};

export default SidebarCategoryItem;
