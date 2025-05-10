import { ChildrenPropsType } from "../../types";
import { Layout } from "antd";

const { Content } = Layout;

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import { Outlet } from "react-router";
import { Breadcrumb } from "@/components";

const AdminMainLayout = () => {
  return (
    <Layout hasSider>
      <Sidebar></Sidebar>
      <Layout className="!relative">
        <Header />
        <Content className="m-4">
          <Breadcrumb />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminMainLayout;
