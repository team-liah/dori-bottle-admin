import { useAuth } from "@/lib/auth/auth-provider";
import { Divider } from "antd";
import { CupSoda, Home, Lock, Megaphone, Package, PcCase, School, Users } from "lucide-react";
import React, { useEffect } from "react";
import Menu, { IMenu } from "./nav";

const mainMenuData: IMenu[] = [
  {
    id: "home",
    name: "홈",
    icon: <Home className="w-5 h-5" />,
    permission: ["ADMIN", "MACHINE_ADMIN"],
    link: {
      path: "/",
    },
  },
  {
    id: "admin",
    name: "관리자",
    icon: <Lock className="w-5 h-5" />,
    permission: ["ADMIN"],
    submenu: [
      {
        id: "adminList",
        name: "관리자 목록",
        link: {
          path: "/admin/list",
        },
      },
    ],
  },
  {
    id: "user",
    name: "회원 관리",
    icon: <Users className="w-5 h-5" />,
    permission: ["ADMIN"],
    submenu: [
      {
        id: "userList",
        name: "회원 목록",
        link: {
          path: "/user/list",
        },
      },
    ],
  },
  {
    id: "group",
    name: "기관 관리",
    icon: <School className="w-5 h-5" />,
    permission: ["ADMIN"],
    submenu: [
      {
        id: "groupList",
        name: "기관 목록",
        link: {
          path: "/group/list",
        },
      },
    ],
  },
  {
    id: "machine",
    name: "기기 관리",
    icon: <PcCase className="w-5 h-5" />,
    permission: ["ADMIN", "MACHINE_ADMIN"],
    submenu: [
      {
        id: "vendingList",
        name: "자판기 목록",
        link: {
          path: "/machine/vending/list",
        },
      },
      {
        id: "collectionList",
        name: "반납함 목록",
        link: {
          path: "/machine/collection/list",
        },
      },
    ],
  },
  {
    id: "cup",
    name: "컵 관리",
    icon: <CupSoda className="w-5 h-5" />,
    permission: ["ADMIN", "MACHINE_ADMIN"],
    submenu: [
      {
        id: "cupList",
        name: "컵 목록",
        link: {
          path: "/cup/cup/list",
        },
      },
    ],
  },
  {
    id: "product",
    name: "상품 관리",
    icon: <Package className="w-5 h-5" />,
    permission: ["ADMIN"],
    submenu: [
      {
        id: "productList",
        name: "버블 상품 목록",
        link: {
          path: "/product/bubble/list",
        },
      },
    ],
  },
  {
    id: "post",
    name: "게시글 관리",
    icon: <Megaphone className="w-5 h-5" />,
    permission: ["ADMIN"],
    submenu: [
      {
        id: "noticeList",
        name: "공지사항 목록",
        link: {
          path: "/post/notice/list",
        },
      },
      {
        id: "fnaList",
        name: "FAQ 목록",
        link: {
          path: "/post/faq/list",
        },
      },
    ],
  },
];

const MainMenu = () => {
  const { profile } = useAuth();
  const [renderedMenu, setRenderedMenu] = React.useState<IMenu[]>([]);

  useEffect(() => {
    if (profile) setRenderedMenu(mainMenuData.filter((menu) => menu.permission?.includes(profile?.role)));
  }, [profile]);

  if (!profile) return <></>;

  return (
    <>
      <>
        <Divider orientation="left" plain>
          메인
        </Divider>

        <Menu data={renderedMenu} />
      </>
    </>
  );
};

export default React.memo(MainMenu);
