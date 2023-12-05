import { getDefaultLayout, IDefaultLayoutPage, IPageHeader } from "@/components/layout/default-layout";
import UserList from "@/components/page/user/user-list";
import UserSearch from "@/components/page/user/user-search";

const pageHeader: IPageHeader = {
  title: "회원 목록",
};

const UserListPage: IDefaultLayoutPage = () => {
  return (
    <>
      <UserSearch />
      <UserList />
    </>
  );
};

UserListPage.getLayout = getDefaultLayout;
UserListPage.pageHeader = pageHeader;

export default UserListPage;
