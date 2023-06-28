import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomComponent';
import DashboardItem from '@/components/dashboard/DashboardItem';
import SidebarLayout from '@/components/layout/SidebarLayout';

//#region Styled Component

const GridContainer = tw.div`
  h-[calc(100%-84px)] grid grid-rows-[1fr,1fr] grid-cols-[1fr,1fr] gap-4`;

//#endregion

const Dashboard = () => {
  return (
    <SidebarLayout>
      <Custom.TitleContainer>
        <Custom.Title>Dashboard</Custom.Title>
      </Custom.TitleContainer>
      <GridContainer>
        <Custom.ShadowContainer>
          <DashboardItem title="대시보드 1">
            차트로 표기해도 좋을 듯
          </DashboardItem>
        </Custom.ShadowContainer>
        <Custom.ShadowContainer>
          <DashboardItem title="대시보드 2">{/* <MapSvg /> */}</DashboardItem>
        </Custom.ShadowContainer>
        <Custom.ShadowContainer>
          <DashboardItem title="대시보드 3">테이블 형태로</DashboardItem>
        </Custom.ShadowContainer>
        <Custom.ShadowContainer>
          <DashboardItem title="대시보드 4">테이블 형태로</DashboardItem>
        </Custom.ShadowContainer>
      </GridContainer>
    </SidebarLayout>
  );
};

export default Dashboard;
