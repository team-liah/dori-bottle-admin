import { getAdminRoleLabel } from "@/client/admin";
import { logout } from "@/client/auth";
import { useAuth } from "@/lib/auth/auth-provider";
import { Dropdown, MenuProps } from "antd";
import { ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import React, { useCallback } from "react";

const Profile = () => {
  const { profile, mutateProfile } = useAuth();

  const handleLogoutClick = useCallback(async () => {
    await logout();
    mutateProfile?.();
  }, [mutateProfile]);

  const items: MenuProps["items"] = [
    {
      label: (
        <Link href={`/admin/edit/${profile?.id}`} className="link-with-icon min-w-[8rem]">
          <User width={16} height={16} />내 프로필
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <a onClick={handleLogoutClick} className="link-with-icon">
          <LogOut width={16} height={16} />
          로그아웃
        </a>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <div className="ml-2">{getAdminRoleLabel(profile?.role) || "Administrator"}</div>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <button className="flex items-center px-2 text-gray-600 rounded enable-transition hover:bg-gray-200">
          <span className="ellipsis-text sm:max-w-[10rem]">{profile?.name || "관리자"}</span>
          <ChevronDown className="w-5 h-5" />
        </button>
      </Dropdown>
    </>
  );
};

export default React.memo(Profile);
