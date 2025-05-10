import { Divider } from "@/components";
import { Header as Headerc } from "antd/es/layout/layout";
import { Dropdown, Flex, MenuProps, Avatar, Badge } from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  KeyOutlined,
  FacebookOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import React from "react";
import { Link } from "react-router";

const { Search } = Input;

const notificationItems: MenuProps["items"] = [
  {
    key: "3",
    label: (
      <>
        <Link to=""></Link>
      </>
    ),
  },
];
const userItems: MenuProps["items"] = [
  {
    key: "userInfo",
    label: <Link to="">Tài khoản</Link>,
    icon: <UserOutlined></UserOutlined>,
  },
  {
    key: "",
    label: <Link to="">Đổi mật khẩu</Link>,
    icon: <KeyOutlined></KeyOutlined>,
  },
  {
    key: "ccc",
    label: <Link to="cc">Cổng thông tin</Link>,
    icon: <FacebookOutlined></FacebookOutlined>,
  },
];
const menuNotificationStyle: React.CSSProperties = {
  boxShadow: "none",
  maxHeight: "400px",
  minHeight: "300px",
  overflowY: "auto",
};
const menuUserStyle: React.CSSProperties = {
  boxShadow: "none",
  marginBottom: "-14px",
};
function Header() {
  return (
    <Headerc
      style={{
        position: "sticky",
        zIndex: 1,
        top: 0,
        right: 0,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Flex className="h-[100%] items-center justify-between">
        <Search placeholder="Tìm kiếm" className="!w-sm" allowClear></Search>
        <Flex align="center">
          <button className="hover:border-b-primary ml-2 block w-10 cursor-pointer items-center border-b-2 border-b-transparent hover:bg-gray-100">
            <SunOutlined />
          </button>
          <Dropdown
            trigger={["click"]}
            menu={{ items: notificationItems }}
            dropdownRender={(menu) => (
              <div className="w-100 translate-x-4 rounded-[4px] bg-white shadow-xl shadow-gray-300">
                <h1 className="text-primary relative mb-4 content-center pt-4 text-center text-[1.1rem]">
                  Thông báo (69)
                  <div className="bg-primary absolute -bottom-4 left-35 h-0.5 w-30"></div>
                </h1>
                <Divider></Divider>
                {React.cloneElement(
                  menu as React.ReactElement<{
                    style: React.CSSProperties;
                  }>,
                  { style: menuNotificationStyle },
                )}
                <Divider className=""></Divider>
                <div className="flex items-center p-1 text-[1rem]">
                  <button className="flex-1">Đánh dấu đã đọc</button>
                  <Divider type="vertical"></Divider>
                  <button className="flex-1">Tải thêm</button>
                </div>
              </div>
            )}
          >
            <button className="hover:border-b-primary w-10 cursor-pointer border-b-2 border-b-transparent hover:bg-gray-100">
              <Badge dot>
                <BellOutlined></BellOutlined>
              </Badge>
            </button>
          </Dropdown>
          <Dropdown
            menu={{ items: userItems }}
            trigger={["click"]}
            dropdownRender={(menu) => (
              <div className="translate-x-4 rounded-[4px] bg-white shadow-xs shadow-gray-300">
                {React.cloneElement(
                  menu as React.ReactElement<{
                    style: React.CSSProperties;
                  }>,
                  { style: menuUserStyle },
                )}
                <Divider className="!mt-5"></Divider>
                <div className="pt-1 pb-1 hover:bg-red-100">
                  <Link to="/logout" className="ml-4 !text-red-500">
                    <LogoutOutlined className="mr-2 !text-red-500"></LogoutOutlined>
                    Đăng xuất
                  </Link>
                </div>
              </div>
            )}
          >
            <button className="hover:border-b-primary hover:bg-grayblock ml-2 block w-10 cursor-pointer items-center border-b-2 border-b-transparent">
              <Avatar size={"large"} icon={<UserOutlined />} />
            </button>
          </Dropdown>
        </Flex>
      </Flex>
    </Headerc>
  );
}

export default Header;
