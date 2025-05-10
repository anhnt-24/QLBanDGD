import { Sidebar as Sidebarc, MenuItemType, GetMenuItem } from "@/components";
import { Menu } from "antd";

import {
  HomeOutlined,
  UserOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router";

const items: MenuItemType[] = [
  {
    label: (
      <NavLink to="dashboard" relative="route">
        Trang chủ
      </NavLink>
    ),
    icon: <HomeOutlined />,
  },
  {
    label: <span>Khách hàng</span>,
    icon: <UserOutlined />,
    children: [
      {
        key: "client-mangage",
        label: <NavLink to="/admin/customer">Quản lý</NavLink>,
      },
      {
        key: "client-message",
        label: <NavLink to="/admin/chat">Tin nhắn</NavLink>,
      },
    ],
    title: "conca",
  },

  {
    label: "Sản phẩm",
    icon: <ProductOutlined />,
    children: [
      {
        key: "product-manage",
        label: (
          <NavLink to="/admin/category" relative="route">
            Danh mục
          </NavLink>
        ),
      },
      {
        key: "product-message",
        label: <NavLink to="/admin/product">Sản phẩm</NavLink>,
      },
    ],
  },
  {
    label: (
      <NavLink to="/admin/order" relative="path">
        Đơn hàng
      </NavLink>
    ),
    icon: <ShoppingCartOutlined />,
  },
  // {
  //   label: <NavLink to="/admin">Báo cáo</NavLink>,
  //   icon: <SnippetsOutlined />,
  // },
  // {
  //   label: <NavLink to="/admin">Lịch trình</NavLink>,
  //   icon: <CalendarOutlined />,
  // },
  // {
  //   label: <NavLink to="/admin">Bài viết</NavLink>,
  //   icon: <BookOutlined />,
  // },
].map((item, index) =>
  GetMenuItem(item?.label, index, item?.icon, item?.children),
);
function Sidebar() {
  return (
    <Sidebarc
      style={{
        height: "100vh",
        position: "sticky",
        insetInlineStart: 0,
        top: 0,
        zIndex: 2,
        bottom: 0,
        scrollbarWidth: "thin",
        scrollbarGutter: "stable",
      }}
    >
      <div className="flex h-50 items-center border-b border-gray-200">
        <img src="/assets/logo.png" className="" alt="" />
      </div>
      <Menu theme="light" mode="inline" items={items} />
    </Sidebarc>
  );
}

export default Sidebar;
